const express = require('express');
const router = express.Router();
const { db } = require('../services/firebase');
const { sendSMS } = require('../services/twilio');

// POST /api/alerts
router.post('/', async (req, res) => {
    try {
        const { crop, mandi, targetPrice, phone, language } = req.body;

        // Basic validation
        if (!crop || !mandi || !targetPrice || !phone) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const newAlert = await db.addAlert({
            crop,
            mandi,
            targetPrice: Number(targetPrice),
            phone,
            language: language || 'en'
        });

        // Dispatch instant confirmation SMS so the demo feels responsive
        const confirmMsg = `HarvestIQ: Your price alert for ${crop} at ${mandi} is set to ₹${targetPrice}/qtl. We'll notify you when it reaches this target!`;
        const smsResponse = await sendSMS(phone, confirmMsg);

        if (!smsResponse.success && !smsResponse.simulated) {
            // Surface Twilio error to the Frontend UI so the user knows exactly why it failed
            return res.status(400).json({ success: false, message: smsResponse.error });
        }

        res.status(201).json({
            success: true,
            data: newAlert,
            message: 'Alert set successfully'
        });

    } catch (error) {
        console.error('Alert creation error:', error);
        res.status(500).json({ success: false, message: 'Server error creating alert' });
    }
});

// GET /api/alerts - debugging purposes
router.get('/', async (req, res) => {
    const alerts = await db.getActiveAlerts();
    res.json({ success: true, data: alerts });
});

module.exports = router;
