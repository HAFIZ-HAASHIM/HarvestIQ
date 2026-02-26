const express = require('express');
const router = express.Router();
const axios = require('axios');

// Basic mock storage facilities near typical Mandis
const mockStorageFacilities = {
    'mangaluru': [
        { name: 'Udupi Cold Storage', distanceKm: 11, costPerQuintalPerWeek: 40, lat: 13.3400, lng: 74.7420 },
        { name: 'Mangalore Port Warehousing', distanceKm: 18, costPerQuintalPerWeek: 35, lat: 12.9141, lng: 74.8560 }
    ],
    'hubli': [
        { name: 'Hubli Central FCI', distanceKm: 5, costPerQuintalPerWeek: 38, lat: 15.3647, lng: 75.1240 },
    ],
    // Fallback
    'default': [
        { name: 'State SWC Warehouse', distanceKm: 15, costPerQuintalPerWeek: 42, lat: 0, lng: 0 }
    ]
};

// GET /api/weather/:mandi
router.get('/:mandi', async (req, res) => {
    try {
        const { mandi } = req.params;
        const apiKey = process.env.OPENWEATHER_API_KEY;

        // Call OpenWeatherMap API
        // 5 day forecast / 3 hour data
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${mandi},IN&appid=${apiKey}&units=metric`;

        const response = await axios.get(url);
        const forecasts = response.data.list;

        // Check for rain or high humidity in the next 5 days
        let willRain = false;
        let highHumidity = false;
        let maxHumidity = 0;

        for (let forecast of forecasts) {
            if (forecast.weather[0].main.toLowerCase().includes('rain')) {
                willRain = true;
            }
            if (forecast.main.humidity > maxHumidity) {
                maxHumidity = forecast.main.humidity;
            }
            if (forecast.main.humidity > 80) {
                highHumidity = true;
            }
        }

        const isRisk = willRain || highHumidity;

        res.json({
            success: true,
            data: {
                location: response.data.city.name,
                currentTemp: forecasts[0].main.temp,
                currentHumidity: forecasts[0].main.humidity,
                weatherMain: forecasts[0].weather[0].main,
                forecast: {
                    willRain,
                    maxHumidity,
                    highHumidityRisk: highHumidity
                },
                riskLevel: isRisk ? 'HIGH' : 'LOW',
                message: isRisk
                    ? 'High humidity alert — risk of grain spoilage if stored without moisture control'
                    : 'Storage conditions safe'
            }
        });

    } catch (error) {
        console.error('Weather API Error:', error.message);
        // Fallback if API fails/rate limited
        res.json({
            success: true,
            data: {
                location: req.params.mandi,
                currentTemp: 28,
                currentHumidity: 65,
                weatherMain: 'Clear',
                riskLevel: 'LOW',
                message: 'Storage conditions safe (Mock Fallback due to API error)'
            }
        });
    }
});

// GET /api/storage/:mandi
router.get('/:mandi', (req, res) => {
    const { mandi } = req.params;
    const facilities = mockStorageFacilities[mandi.toLowerCase()] || mockStorageFacilities['default'];

    res.json({
        success: true,
        data: {
            facilities,
            nabardLoan: {
                maxPercentage: 75,
                interestRateAnnually: 7,
                documents: ['Aadhaar Card', 'Farmer ID', 'Warehouse Receipt', 'Bank Passbook']
            }
        }
    });
});

module.exports = router;
