const axios = require('axios');
const cheerio = require('cheerio');

exports.scrapeCraigslist = async (req, res) => {
    const { zipCode, carModel } = req.query;

    if (!zipCode || !carModel) {
        console.log("Error: Missing parameters");
        return res.status(400).json({ error: 'Missing parameters' });
    }

    try {
        console.log(`Searching Craigslist for ${carModel} in zip code ${zipCode}`);

        const searchUrl = `https://mankato.craigslist.org/search/cta?postal=${zipCode}&query=${carModel}`;
        console.log(`Search URL: ${searchUrl}`);

        const response = await axios.get(searchUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        console.log("Received response from Craigslist");

        const $ = cheerio.load(response.data);
        const carListings = [];

        console.log("Parsing listings...");

        $('.result-row').each((index, element) => {
            const title = $(element).find('.result-title').text().trim();
            const price = $(element).find('.result-price').text().trim();
            const link = $(element).find('.result-title').attr('href');

            console.log(`Found listing: ${title} - ${price} - ${link}`);

            carListings.push({ title, price, link });
        });

        if (carListings.length === 0) {
            console.log("No listings found");
        }

        res.json({ results: carListings });
    } catch (error) {
        console.error("Error during scraping:", error);
        res.status(500).json({ error: 'Scraping failed' });
    }
};
