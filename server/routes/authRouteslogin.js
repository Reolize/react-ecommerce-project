const authRouteslogin = require('./server/model/authModellogin');
const express = require('express');
const router = express.Router();

// Example login route
router.post('/login', (req, res) => {
    // Handle login logic here
    res.send('Login route');
});

module.exports = router;
