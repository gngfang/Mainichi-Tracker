/* Bring express and router */
const express = require('express');
const router = express.Router();
const db = require('../models');



// index
router.get('/', function (req, res) {
    db.Transaction.find({}, function (error, allTransaction) {
        if (error) {
            res.send({ message: "Internal Server Error" })
        } else {
            const context = { transaction: allTransaction }
            res.render('transaction/index', context);
        }
    });
});




// New Route

router.get('/new', function (req, res) {
    res.render('transaction/new');
});


// Create Route

router.post('/', function (req, res) {
    db.Transaction.create(req.body, function (error, createdTransaction) {
        if (error) {
            res.send({ message: "Internal Server Error" })
        } else {
            res.redirect('/transactions');
        }
    });
});












/* Exporting out */
module.exports = router
