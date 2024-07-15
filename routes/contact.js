const express = require('express');
const router = express.Router();

// GET contact page
router.get('/', function (req, res, next) {
    res.render('contact', { title: 'Contact Us' });
});

// POST contact form
router.post('/', function (req, res, next) {
    const { name, email, message } = req.body;
    // Here, you would typically handle the form submission, e.g., save to the database, send an email, etc.
    console.log(`Received contact form submission: ${name}, ${email}, ${message}`);
    res.redirect('/contact'); // Redirect back to the contact page (or show a success message)
});

module.exports = router;
