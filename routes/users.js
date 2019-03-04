const express = require('express');
const router = express.Router();

router.get('/login', (req, res, next) => {
    res.send('routes/users.js => login');
});

router.get('/register', (req, res, next) => {
    res.send('routes/users.js => register');
});

module.exports = router;