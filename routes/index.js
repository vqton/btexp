const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Pug Example', message: 'Hello, Pug!' });
});

module.exports = router;
