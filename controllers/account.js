/* Bring express and router */
const express = require('express');
const router = express.Router();
const db = require('../models');


/* Route */

// Index Route

router.get('/', function (req, res) {
    res.render('account/index')
});


















/* Exporting out */
module.exports = router