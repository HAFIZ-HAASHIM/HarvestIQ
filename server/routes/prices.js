const express = require('express');
const router = express.Router();
const { mockPrices } = require('../data/mockPrices');

// GET /api/prices/:crop/:mandi
router.get('/:crop/:mandi', async (req, res) => {
    try {
        const { crop, mandi } = req.params;

        // Find mock data
        const data = mockPrices.find(
            p => p.crop.toLowerCase() === crop.toLowerCase() &&
                p.mandi.toLowerCase() === mandi.toLowerCase()
        );

        if (data) {
            res.json({
                success: true,
                data: {
                    crop: data.crop,
                    mandi: data.mandi,
                    price: data.price,
                    currency: 'INR',
                    unit: 'Quintal',
                    timestamp: new Date().toISOString(),
                    source: 'Agmarknet (Mock Fallback)'
                }
            });
        } else {
            res.status(404).json({ success: false, message: 'Price data not found for selection' });
        }
    } catch (error) {
        console.error('Price fetch error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching prices' });
    }
});

module.exports = router;
