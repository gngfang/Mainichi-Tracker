/* Bring express and router */
const express = require('express');
const router = express.Router();
const db = require('../models');

// New Route

router.get('/new', function (req, res) {
    res.render('transaction/new');
});




















/* Exporting out */
module.exports = router
