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
            const context = { transaction: allTransaction }
            res.render('transaction/index', context);
        }
    });
});




// New Route
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



/* Create Route */

router.post('/', function (req, res) {

    db.Transaction.create(req.body, function (error, createdTransaction) {
        if (error) {
            console.log(error)
            res.send({ message: "Internal Server Error" })
        } else {
            db.Account.findById(createdTransaction.accounts, function (error, foundAccount) {
                console.log(foundAccount.balance, req.body.transactionType)
                if (error) {

                    res.send({ messgae: "Internal Server Error" })
                } else {
                    foundAccount.transactions.push(createdTransaction);

                    /* If else statement to reflect account balance */
                    if (createdTransaction.transactionType === "Deposit" || createdTransaction.transactionType === "ACH Credit" || createdTransaction.transactionType === "Check Deposit") {
                        foundAccount.balance += createdTransaction.transactionAmount;
                    } else if (createdTransaction.transactionType === "Withdrawal" || createdTransaction.transactionType === "ACH Debit" || createdTransaction.transactionType === "Check Issuance") {
                        foundAccount.balance -= createdTransaction.transactionAmount;

                    }
                    foundAccount.save();
                    res.redirect('/transactions');
                }
            })
        }
    });
});



// Show Route
router.get('/:id', (req, res) => {
    db.Transaction.findById(req.params.id, function (error, foundTransaction) {
        if (error) {
            res.send({ message: "Internal Server Error" })
        } else {
            const context = { transaction: foundTransaction }
            res.render('transaction/show', context);
        }
    });
});


// edit view Route

router.get('/:id/edit', function (req, res) {
    // search for accounts 
    db.Transaction.findById(req.params.id, function (error, findTransaction) {
        if (error) {
            res.send({ message: "Internal Server Error" })
        } else {
            const context = { transaction: findTransaction }
            res.render('transaction/edit', context);

        }

    });

});

// Update Route

router.put('/:id/update', function (req, res) {
    // finding the transaction id 
    db.Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (error, foundTransaction) {
        if (error) {
            console.log(error)
            res.send({ message: 'Internal Server' })
        } else {
            db.Account.findById(foundTransaction.accounts, function (error, foundAccount) {
                console.log(foundAccount.balance, req.body.transactionType)
                if (error) {

                    res.send({ messgae: "Internal Server Error" })
                } else {

                    /* If else statement to reflect account balance */
                    if (foundTransaction.transactionType === "Deposit" || foundTransaction.transactionType === "ACH Credit" || foundTransaction.transactionType === "Check Deposit") {
                        foundAccount.balance += foundTransaction.transactionAmount;
                    } else if (foundTransaction.transactionType === "Withdrawal" || foundTransaction.transactionType === "ACH Debit" || foundTransaction.transactionType === "Check Issuance") {
                        foundAccount.balance -= foundTransaction.transactionAmount;

                    }
                    foundTransaction.save();
                    foundAccount.save();
                    res.redirect('/accounts');
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
            /* db.Account.findById(deletedTransactions.accounts, function (error, foundAccount) {
                if (error) {
                    console.log(error)
                    res.send({ message: 'Internal Server Error' })
                } else {
                    foundAccount.accounts.remove(deletedTransactions);
                    foundAccount.save(); */
            res.redirect('/accounts');
        }
    });
});









/* Exporting out */
module.exports = router
