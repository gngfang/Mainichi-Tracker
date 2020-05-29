/* Bring express and router */
const express = require('express');
const router = express.Router();
const db = require('../models');


/* Route */

// Index Route

router.get('/', function (req, res) {
    res.render('account/index');
});


// New Route

router.get('/new', function (req, res) {
    res.render("account/new");
});

















/* Exporting out */
module.exports = router