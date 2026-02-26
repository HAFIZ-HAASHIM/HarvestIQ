const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve Static Vanilla Frontend Files correctly
app.use(express.static(path.join(__dirname, 'public')));

// Routes will be imported here
const pricesRouter = require('./routes/prices');
const forecastRouter = require('./routes/forecast');
const storageRouter = require('./routes/storage');
const weatherRouter = require('./routes/weather');
const alertsRouter = require('./routes/alerts');

app.use('/api/prices', pricesRouter);
app.use('/api/forecast', forecastRouter);
app.use('/api/storage', storageRouter);
app.use('/api/weather', weatherRouter);
app.use('/api/alerts', alertsRouter);

// Fallback all to main index
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`HarvestIQ Server is running on port ${PORT}`);

    // Require cron jobs to start scheduling
    require('./cron/alertChecker');
});
