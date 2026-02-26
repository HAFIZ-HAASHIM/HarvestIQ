const express = require('express');
const router = express.Router();

const mockStorageFacilities = {
    'mangaluru': [
        { name: 'Udupi Cold Storage', distanceKm: 11, costPerQuintalPerWeek: 40, lat: 13.3400, lng: 74.7420 },
        { name: 'Mangalore Port Warehousing', distanceKm: 18, costPerQuintalPerWeek: 35, lat: 12.9141, lng: 74.8560 }
    ],
    'hubli': [
        { name: 'Hubli Central FCI', distanceKm: 5, costPerQuintalPerWeek: 38, lat: 15.3647, lng: 75.1240 },
    ],
    'default': [
        { name: 'State SWC Warehouse', distanceKm: 15, costPerQuintalPerWeek: 42, lat: 0, lng: 0 }
    ]
};

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
