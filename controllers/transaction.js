/* Bring express and router */
const express = require('express');
const router = express.Router();
const db = require('../models');




// index
router.get('/', function (req, res) {
    db.Transaction.find({}).populate('accounts').exec(function (error, allTransaction) {
        if (error) {
            res.send({ message: "Internal Server Error" })
        } else {
            // db.Account.find({},function(error,))
            const context = { transaction: allTransaction }
            res.render('transaction/index', context);
        }
    });
});


// New Route

/* router.get('/new', function (req, res) {
    res.render('transaction/new');
}); */

// testing
router.get('/new', function (req, res) {
    // search for accounts 
    db.Account.find({}, function (error, findAccount) {
        if (error) {
            res.send({ message: "Internal Sserver Error" })
        } else {
            const context = { accounts: findAccount }
            res.render('transaction/new', context);
        }
    });
});

// Create Route

/* router.post('/', function (req, res) {
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
            Account.findById(createdTransaction.accounts, function (error, findAccount) {
                if (error) {
                    res.send({ messge: "Internal Server Error" })
                } else {
                    findAccount.accounts.push(createdTransaction);
                    findAccount.save()
                    res.redirect('/transactions');
                }
            });
        }
    });
}); */

/* Normal Create Route */

router.post('/', function (req, res) {

    db.Transaction.create(req.body, function (error, createdTransaction) {
        if (error) {
            console.log(error)
            res.send({ message: "Internal Server Error" })
        } else {
            db.Account.findById(createdTransaction.accounts, function (error, foundAccount) {
                if (error) {
                    res.send({ messgae: "Internal Server Error" })
                } else {
                    foundAccount.transactions.push(createdTransaction);
                    foundAccount.save();
                    res.redirect('/transactions');
                }
            })
        }
    });
});

// delete route

router.delete('/:id', function (req, res) {
    db.Transaction.findByIdAndDelete(req.params.id, function (error, deletedTransactions) {
        if (error) {
            res.send({ message: "Internal Server Error" });
        } else {
            res.redirect('/transactions');
        }
    })
})









/* Exporting out */
module.exports = router
