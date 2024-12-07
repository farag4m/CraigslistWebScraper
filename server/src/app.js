const express = require('express');
const cors = require('cors');
const scrapeRoutes = require('./routes/scrapeRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/scrape', scrapeRoutes);

module.exports = app;