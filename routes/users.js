const express = require('express');
const router = express.Router();

router.get('/login', (req, res, next) => {
    //res.send('routes/users.js => login');
    res.render('login');
});

router.get('/register', (req, res, next) => {
   // res.send('routes/users.js => register');
   res.render('register'); 
});

router.post('/register', (req, res, next) => {
    console.log(req.body);
    res.send('routes/users.js (post) => register');
 });

module.exports = router; 