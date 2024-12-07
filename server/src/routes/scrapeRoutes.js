const express = require('express');
const { scrapeCraigslist } = require('../controllers/scrapeController');

const router = express.Router();
router.get('/', scrapeCraigslist);

module.exports = router;