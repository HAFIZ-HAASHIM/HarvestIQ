const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const { db } = require('../services/firebase');
const { sendSMS } = require('../services/twilio');
const { mockPrices } = require('../data/mockPrices'); // Mock proxy

// Helper to extract translated template String from a pure JS locale file
function getLocalizedMessage(lang, cropKey, mandi, targetPrice, currentPrice) {
    try {
        const localePath = path.join(__dirname, '..', 'public', 'locales', `${lang}.js`);
        if (fs.existsSync(localePath)) {
            const fileContent = fs.readFileSync(localePath, 'utf8');

            // Extract the alert.sms_message template string via regex
            const match = fileContent.match(/sms_message:\s*"([^"]+)"/);
            const cropMatch = fileContent.match(new RegExp(`${cropKey}:\\s*"([^"]+)"`));

            if (match && match[1]) {
                let template = match[1];
                let localizedCrop = cropMatch && cropMatch[1] ? cropMatch[1] : cropKey;

                return template
                    .replace('{{mandi}}', mandi)
                    .replace('{{crop}}', localizedCrop)
                    .replace('{{targetPrice}}', targetPrice)
                    .replace('{{currentPrice}}', currentPrice);
            }
        }
    } catch (err) {
        console.error("Localization error in SMS worker", err);
    }

    // Fallback to English
    return `HarvestIQ Alert: ${cropKey} at ${mandi} Mandi has crossed ₹${targetPrice}/quintal. Current price: ₹${currentPrice}. Good time to sell! - HarvestIQ`;
}

// Run every 6 hours: '0 */6 * * *'
// For demo testing, runs every 1 minute: '* * * * *'
cron.schedule('* * * * *', async () => {
    console.log('[CRON] Running alert checks...');

    try {
        const activeAlerts = await db.getActiveAlerts();
        if (activeAlerts.length === 0) return;

        for (let alert of activeAlerts) {
            // Find current price (acting as external Agmarknet query for alert checker)
            const data = mockPrices.find(
                p => p.crop.toLowerCase() === alert.crop.toLowerCase() &&
                    p.mandi.toLowerCase() === alert.mandi.toLowerCase()
            );

            if (data && data.price >= alert.targetPrice) {
                // Trigger condition met!
                const cropKey = alert.crop.toLowerCase().replace(/[^a-z]/g, '');
                const lang = alert.language || 'en';

                const message = getLocalizedMessage(lang, cropKey, alert.mandi, alert.targetPrice, data.price);

                console.log(`[Alert Triggered] For ${alert.phone} [${lang}]: ${message}`);

                const smsResult = await sendSMS(alert.phone, message);

                if (smsResult.success) {
                    await db.markTriggered(alert.id);
                }
            }
        }

    } catch (error) {
        console.error('[CRON Error] Failed to process alerts:', error);
    }
});
