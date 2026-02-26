// Mock prices for February 2026 Indian mandi rates
const mockPrices = [
  { crop: 'Tomato', mandi: 'Mangaluru', price: 1240, high: 1540, low: 1100 },
  { crop: 'Tomato', mandi: 'Hubli', price: 1180, high: 1400, low: 1050 },
  { crop: 'Tomato', mandi: 'Pune', price: 1050, high: 1300, low: 900 },
  { crop: 'Tomato', mandi: 'Nashik', price: 950, high: 1200, low: 850 },
  { crop: 'Tomato', mandi: 'Azadpur Delhi', price: 1350, high: 1600, low: 1200 },

  { crop: 'Wheat', mandi: 'Mangaluru', price: 2800, high: 2950, low: 2650 },
  { crop: 'Wheat', mandi: 'Hubli', price: 2750, high: 2900, low: 2600 },
  { crop: 'Wheat', mandi: 'Pune', price: 2600, high: 2800, low: 2500 },
  { crop: 'Wheat', mandi: 'Nashik', price: 2550, high: 2750, low: 2450 },
  { crop: 'Wheat', mandi: 'Azadpur Delhi', price: 2900, high: 3100, low: 2750 },

  { crop: 'Rice (Paddy)', mandi: 'Mangaluru', price: 2300, high: 2500, low: 2200 },
  { crop: 'Rice (Paddy)', mandi: 'Hubli', price: 2250, high: 2450, low: 2150 },
  { crop: 'Rice (Paddy)', mandi: 'Pune', price: 2400, high: 2600, low: 2300 },
  { crop: 'Rice (Paddy)', mandi: 'Nashik', price: 2350, high: 2550, low: 2250 },
  { crop: 'Rice (Paddy)', mandi: 'Azadpur Delhi', price: 2600, high: 2850, low: 2500 },

  { crop: 'Onion', mandi: 'Mangaluru', price: 2100, high: 2400, low: 1800 },
  { crop: 'Onion', mandi: 'Hubli', price: 1950, high: 2250, low: 1700 },
  { crop: 'Onion', mandi: 'Pune', price: 1600, high: 1900, low: 1400 },
  { crop: 'Onion', mandi: 'Nashik', price: 1450, high: 1800, low: 1200 },
  { crop: 'Onion', mandi: 'Azadpur Delhi', price: 2200, high: 2500, low: 1900 },

  { crop: 'Maize', mandi: 'Mangaluru', price: 2050, high: 2200, low: 1950 },
  { crop: 'Maize', mandi: 'Hubli', price: 1980, high: 2150, low: 1880 },
  { crop: 'Maize', mandi: 'Pune', price: 2150, high: 2300, low: 2050 },
  { crop: 'Maize', mandi: 'Nashik', price: 2100, high: 2250, low: 2000 },
  { crop: 'Maize', mandi: 'Azadpur Delhi', price: 2250, high: 2400, low: 2150 }
];

module.exports = { mockPrices };
