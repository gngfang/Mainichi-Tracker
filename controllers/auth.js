

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../models');

// register form
router.get('/register', function (req, res) {
    res.render('auth/register')
});

// register form post route or create route
// Use async and await due to too much nested function
router.post('/register', async function (req, res) {
    try {
        // find the email and see if there is a user existing or email exist
        const foundUser = await db.User.findOne({ email: req.body.email });
        if (foundUser) {
            return res.send({ messsage: "Email already registered" })
        }
        // if not found do the password hashing
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        // create user and redirect back to login

        const newUser = db.User.create(req.body);
        res.redirect('/login');

    } catch (error) {

        res.send({ messsage: "Internal Server Error" })
    }

});

// Login Form
router.get('/login', function (req, res) {
    res.render('auth/login');
});

// login post
router.post('/login', async function (req, res) {

    try {
        const foundUser = await db.User.findOne({ email: req.body.email });
        if (!foundUser) {
            return res.send({ message: 'Password or Email Incorrect' });
        }
        const match = await bcrypt.compare(req.body.password, foundUser.password);
        if (!match) {
            return res.send({ message: "Password or Email Incorrect" });

        }


        req.session.currentUser = {
            id: foundUser._id,
            username: foundUser.username,
        };
        res.redirect('/accounts');


    } catch (error) {
        res.send({ message: "Internal Server Error" })
    }


})









module.exports = router;