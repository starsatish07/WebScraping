# 🎉 EventPulse Sydney

EventPulse Sydney is a Node.js-based full-stack web app that scrapes upcoming Sydney events from [Eventbrite](https://www.eventbrite.com.au/d/australia--sydney/events/), stores them in MongoDB, and displays them on a simple frontend. Users can subscribe with their email to receive ticket links instantly.

---

## 🚀 Features

- 🕷️ Web scraping with Axios + Cheerio
- ⏱️ Scheduled scraping every 6 hours using `node-cron`
- 💾 MongoDB database for event storage
- 📧 Email ticket links using Nodemailer
- 📦 Clean and minimal EJS frontend
- 🛡️ Environment variables protected using `.env`
- 🧼 `.gitignore` excludes `node_modules` and secrets

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Scraping:** Axios, Cheerio  
- **Database:** MongoDB (via Mongoose)  
- **Email Service:** Nodemailer  
- **Templating:** EJS  
- **Scheduler:** node-cron

---

## 📁 Project Structure

── models/
│ └── Event.js # Mongoose model
├── public/
│ └── styles.css # Optional styling
├── routes/
│ └── events.js # All route handlers
├── views/
│ └── index.ejs # Main frontend view
├── scraper.js # Scraper logic
├── server.js # Main server file
├── .env # Environment variables (NOT committed)
├── .gitignore # Git ignore file

# 1. Clone the repository
git clone https://github.com/your-username/eventpulse-sydney.git
cd eventpulse-sydney

# 2. Install dependencies
npm install

# 3. Create .env file
touch .env
# Add MONGO_URI, EMAIL_USER, EMAIL_PASS

# 4. Start the server
npm run dev    # or use: node server.js
