/* Bring express and router */
const express = require('express');
const router = express.Router();
const db = require('../models');




// index
router.get('/', function (req, res) {
    db.Transaction.find({ user: req.session.currentUser.id }).populate('accounts').exec(function (error, allTransaction) {
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
    db.Account.find({ user: req.session.currentUser.id }, function (error, findAccount) {
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
    /*  const newTransaction = {
         transactionType: req.body.transactionType,
         transactionAmount: req.body.transactionAmount,
         transactionDescription: req.body.transactionDescription,
         date: req.body.date
     } */
    if (req.body.transactionAmount < 0) {
        return res.send({ message: 'Please input a valid amount' })
    }
    db.Transaction.create(req.body, function (error, createdTransaction) {
        if (error) {
            console.log(error)
            return res.send({ message: "Internal Server Error" })
        } else {
            db.Account.findById(createdTransaction.accounts, function (error, foundAccount) {
                console.log(foundAccount.balance, req.body.transactionType)
                if (error) {

                    return res.send({ messgae: "Internal Server Error" })
                } else {
                    foundAccount.transactions.push(createdTransaction);

                    /* If else statement to reflect account balance */
                    if (createdTransaction.transactionType === "Deposit" || createdTransaction.transactionType === "ACH Credit" || createdTransaction.transactionType === "Check Deposit") {
                        foundAccount.balance += createdTransaction.transactionAmount;
                    } else if (createdTransaction.transactionType === "Withdrawal" || createdTransaction.transactionType === "ACH Debit" || createdTransaction.transactionType === "Check Issuance") {
                        foundAccount.balance -= createdTransaction.transactionAmount;

                    }
                    foundAccount.save();
                    res.redirect('/accounts');
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
    db.Transaction.findById(req.params.id, function (error, previousTransaction) {
        if (error) {
            console.log(error)
            return res.send({ message: "Internal Server Error" })
        }

        db.Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (error, foundTransaction) {
            if (error) {
                console.log(error)
                return res.send({ message: 'Internal Server' })
            }

            db.Account.findById(foundTransaction.accounts, function (error, foundAccount) {
                console.log(foundAccount.balance, req.body.transactionType)
                if (error) {

                    res.send({ messgae: "Internal Server Error" })
                } else {
                    /* If else statement to reflect account balance */
                    if (foundTransaction.transactionType === "Deposit" || foundTransaction.transactionType === "ACH Credit" || foundTransaction.transactionType === "Check Deposit") {

                        if (previousTransaction.transactionType === "Withdrawal" || previousTransaction.transactionType === "ACH Debit" || previousTransaction.transactionType === "Check Issuance") {
                            foundAccount.balance += previousTransaction.transactionAmount
                            foundAccount.balance += foundTransaction.transactionAmount;


                        } else {

                            foundAccount.balance -= previousTransaction.transactionAmount
                            foundAccount.balance += foundTransaction.transactionAmount;
                        }
                    } else if (foundTransaction.transactionType === "Withdrawal" || foundTransaction.transactionType === "ACH Debit" || foundTransaction.transactionType === "Check Issuance") {

                        if (previousTransaction.transactionType === "Deposit" || previousTransaction.transactionType === "ACH Credit" || previousTransaction.transactionType === "Check Deposit") {

                            foundAccount.balance -= previousTransaction.transactionAmount
                            foundAccount.balance -= foundTransaction.transactionAmount;

                        } else {

                            foundAccount.balance += previousTransaction.transactionAmount
                            foundAccount.balance -= foundTransaction.transactionAmount;
                        }
                    }
                    foundTransaction.save();
                    foundAccount.save();
                    res.redirect('/accounts');
                }
            })

        });

    })
});







// delete route

router.delete('/:id', function (req, res) {
    db.Transaction.findByIdAndDelete(req.params.id, function (error, deletedTransactions) {
        if (error) {
            res.send({ message: "Internal Server Error" });
        } else {
            db.Account.findById(deletedTransactions.accounts, function (error, foundAccount) {
                if (error) {
                    console.log(error)
                    res.send({ message: 'Internal Server Error' })
                } else {
                    if (deletedTransactions.transactionType === "Deposit" || deletedTransactions.transactionType === "ACH Credit" || deletedTransactions.transactionType === "Check Deposit") {
                        foundAccount.balance -= deletedTransactions.transactionAmount
                    } else if (deletedTransactions.transactionType === "Withdrawal" || deletedTransactions.transactionType === "ACH Debit" || deletedTransactions.transactionType === "Check Issuance") {

                        foundAccount.balance += deletedTransactions.transactionAmount
                    }
                    deletedTransactions.save()
                    foundAccount.save();
                    res.redirect('/accounts');
                }
            })
        }
    });
});









/* Exporting out */
module.exports = router
