const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./models/Event');

// Load environment variables
dotenv.config();

// Connect to MongoDB if run directly
if (require.main === module) {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to MongoDB');
    scrapeEvents().then(() => {
      console.log('Done scraping.');
      mongoose.disconnect();
    });
  }).catch(err => console.error('MongoDB connection error:', err));
}

// Scraper function
async function scrapeEvents() {
  try {
    const { data } = await axios.get('https://www.eventbrite.com.au/d/australia--sydney/events/');
    const $ = cheerio.load(data);

    await Event.deleteMany(); // Clear old data

    $('.small-card-mobile.eds-l-pad-all-2').each(async (_, el) => {
  const title = $(el).find('h3').text().trim();

  const date = $(el).find('[data-subcontent-key="date"]').text().trim() ||
               $(el).find('.event-details__main-inner').text().trim(); // fallback

  const relativeLink = $(el).find('a').attr('href');
  const link = relativeLink?.startsWith('http') ? relativeLink : `https://www.eventbrite.com.au${relativeLink}`;

  console.log({ title, date, link });

  if (title && link) {
    const event = new Event({ title, date, link });
    await event.save();
  }
});


    console.log('Scraped and saved events.');
  } catch (err) {
    console.error('Scraping error:', err);
  }
}

module.exports = scrapeEvents;
