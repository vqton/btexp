const express = require('express');
const ContactService = require('../services/contactService');

const router = express.Router();
const contactService = new ContactService(); // Dependency Injection

// GET contact page
router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

// POST contact form submission
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await contactService.saveContact(name, email, message);
    res.send('Thank you for your message!');
  } catch (err) {
    console.error("Error processing contact:", err.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
