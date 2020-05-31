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
            const context = { transactions: allTransaction }
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
    const newTransaction = {
        transactionType: req.body.transactionType,
        transactionAmount: req.body.transactionAmount,
        transactionDescription: req.body.transactionDescription,
        date: req.body.date
    }
    db.Transaction.create(newTransaction, function (error, createdTransaction) {
        if (error) {
            res.send({ message: "Internal Server Error" })
        } else {
            res.redirect('/transactions');
        }
    });
});












/* Exporting out */
module.exports = router
