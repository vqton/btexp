const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const indexRoute = require('./routes/index');

// Set the view engine to Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use('/', indexRoute);
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'));



// Routes
app.get('/', (req, res) => {
    res.render('index');
});




// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port 127.0.0.1:${PORT}`);
});
