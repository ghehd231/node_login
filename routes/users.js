const express = require('express');
const router = express.Router();
const User = require('../model/users');
const bcrypt = require('bcryptjs');
const passport = require('passport');


router.get('/logout', (req, res, next) => {
    req.logout();
    req.flash('success_msg','You are logged out');
    res.redirect('/users/login');
});

router.get('/login', (req, res, next) => {
    //res.send('routes/users.js => login');
    res.render('login');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard', //성공하면 대쉬보드로
        failureRedirect: '/users/login', //실패하면 다시 로그인 화면으로
        failureFlash: true
    })(req, res, next);
});


router.get('/register', (req, res, next) => {
   // res.send('routes/users.js => register');
   res.render('register'); 
});

router.post('/register', (req, res, next) => {
    const {name, email, password, password2} = req.body;
    let errors = [];

    if (!name ||!email || !password || !password2){
        errors.push({msg: 'please fill in all fields'});
    }

    if(password !== password2){
        errors.push({msg: 'passwords do not match'});
    }
    if(password.length < 6){
        errors.push({msg: 'password should be at least 6 char'});
    }

    if(errors.length > 0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });
    } else{
        User.findOne({ email: email}).then(user =>{
            if(user){
                errors.push({msg: 'Email already'});
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else{
                const newUser = new User({
                    name,
                    email,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                 req.flash(
                                     'success_msg',
                                     'You are now registered and can log in'
                                 );
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
 });

module.exports = router; 