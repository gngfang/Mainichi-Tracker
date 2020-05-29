/* Bring express and router */
const express = require('express');
const router = express.Router();
const db = require('../models');


/* Route */

// Index Route

router.get('/', function (req, res) {
    db.Account.find({}, function (error, allAccount) {
        if (error) {
            res.send({ message: "Internal Server Error" })
        } else {
            const context = { account: allAccount }
            res.render('account/index', context);
        }
    });
});


// New Route

router.get('/new', function (req, res) {
    res.render("account/new");
});


// Create Route

router.post('/', function (req, res) {
    db.Account.create(req.body, function (error, createdAccount) {
        if (error) {
            res.send({ message: "Internal Server Error" })
        } else {
            res.redirect('/accounts');
        }
    });
});



// Show Route

router.get('/:id', function (req, res) {
    db.Account.findById(req.params.id, function (error, showAccount) {
        if (error) {
            res.send({ message: 'Internal Server Error' })
        } else {
            const context = { account: showAccount }
            res.render('account/show', context)
        }
    });
});













/* Exporting out */
module.exports = router