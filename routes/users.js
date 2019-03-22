const express = require('express');
const router = express.Router();
const User = require('../model/users');
const bcrypt = require('bcryptjs');


router.get('/login', (req, res, next) => {
    //res.send('routes/users.js => login');
    res.render('login');
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
                                //  req.flash(
                                //      'success_msg',
                                //      'You are now registered and can log in'
                                //  );
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