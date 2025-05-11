const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const nodemailer = require('nodemailer');

// Route to display events
router.get('/', async (req, res) => {
  const events = await Event.find();
 // console.log(events); // Debug: log the events
  res.render('index', { events });
});

// Route to handle subscription and email sending
router.post('/subscribe', async (req, res) => {
  const { email, link } = req.body;

  // Create a transporter using the Gmail credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,  // Gmail address
      pass: process.env.EMAIL_PASS   // App password
    }
  });

  // Send email
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,  // Sender address
      to: email,                    // Recipient email
      subject: 'Event Ticket Link - EventPulse Sydney', // Email subject
      text: `Here’s your event link: ${link}` // Email body
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }

  // Redirect user to event link
  res.redirect(link);
});

module.exports = router;
