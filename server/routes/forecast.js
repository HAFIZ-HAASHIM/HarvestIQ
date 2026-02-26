const express = require('express');
const router = express.Router();
const { mockPrices } = require('../data/mockPrices');
const { generateForecast } = require('../services/prediction');

// GET /api/forecast/:crop/:mandi
router.get('/:crop/:mandi', async (req, res) => {
    try {
        const { crop, mandi } = req.params;

        const data = mockPrices.find(
            p => p.crop.toLowerCase() === crop.toLowerCase() &&
                p.mandi.toLowerCase() === mandi.toLowerCase()
        );

        if (!data) {
            return res.status(404).json({ success: false, message: 'Data not found' });
        }

        // Generate historical mock data (past 14 days)
        const historical = [];
        let pastPrice = data.price;
        for (let i = 14; i >= 1; i--) {
            // Create slight variations backward in time
            pastPrice = pastPrice * (1 + (Math.random() * 0.04 - 0.02));
            historical.push({
                day: -i,
                price: Math.round(pastPrice)
            });
        }

        // Include today
        historical.push({ day: 0, price: data.price });

        const forecastData = generateForecast(data.price, 30);

        res.json({
            success: true,
            data: {
                currentPrice: data.price,
                historical,
                forecast: forecastData.predictions,
                insights: forecastData.insights
            }
        });

    } catch (error) {
        console.error('Forecast error:', error);
        res.status(500).json({ success: false, message: 'Server error generating forecast' });
    }
});

module.exports = router;
