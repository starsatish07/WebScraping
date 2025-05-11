const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const scrapeEvents = require('./scraper');
const cron = require('node-cron');
const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', require('./routes/events'));

cron.schedule(
  '0 */6 * * *',
  () => {
    console.log('🕒 Scheduled scraping started...');
    scrapeEvents().catch(err => console.error('Scheduled scrape failed:', err));
  },
  {
    timezone: 'UTC'  // 🔧 This is the key fix
  }
);

scrapeEvents();

app.listen(3000, () => console.log('Server running on http://localhost:3000'));