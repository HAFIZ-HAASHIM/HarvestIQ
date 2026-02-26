const twilio = require('twilio');

const sendSMS = async (to, message) => {
    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const fromPhone = process.env.TWILIO_PHONE_NUMBER;

        let formattedTo = to.toString();
        if (!formattedTo.startsWith('+')) {
            formattedTo = `+91${formattedTo}`;
        }

        if (!accountSid || !authToken || !fromPhone) {
            console.warn('Twilio credentials missing. Simulated SMS send:');
            console.log(`To: ${formattedTo} | Message: ${message}`);
            return { success: true, simulated: true };
        }

        const client = twilio(accountSid, authToken);
        const response = await client.messages.create({
            body: message,
            from: fromPhone,
            to: formattedTo
        });

        console.log(`SMS Sent Data: ${response.sid}`);
        return { success: true, sid: response.sid };

    } catch (error) {
        console.error('Failed to send SMS:', error.message);
        return { success: false, error: error.message };
    }
}

module.exports = { sendSMS };
