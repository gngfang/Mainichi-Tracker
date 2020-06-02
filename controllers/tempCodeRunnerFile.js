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

// show route
/* router.get('/:id', function (req, res) {
    db.Transaction.findById(req.params.id).populate('accounts').exec(function (error, showTransaction) {
        if (error) {
            res.send({ message: "Internal Server Error" })
        } else {
            const context = { transaction: showTransaction }
            res.render('transaction/show', context);
        }
    });
}); */



// Normal Show Route
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


// edit Route

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






//Transaction Update Route

router.put('/:id', function (req, res) {


    db.Transaction.findById(req.params.id, function (error, findTransaction) {
        if (error) {
            console.log(error)
            res.send({ message: "Internal Server Error" })
        } else {
            db.Account.findById(findTransaction.accounts, function (error, foundAccount) {
                console.log(foundAccount.balance)
                if (error) {
                    res.send({ messgae: "Internal Server Error" })
                } else {
                    // foundAccount.transactions.push(createdTransaction);
                    /* If else statement to reflect account balance */
                    if (findTransaction.transactionType === "Deposit" || findTransaction.transactionType === "ACH Credit" || findTransaction.transactionType === "Check Deposit") {
                        foundAccount.balance += findTransaction.transactionAmount;
                    } else if (findTransaction.transactionType === "Withdrawal" || findTransaction.transactionType === "ACH Debit" || findTransaction.transactionType === "Check Issuance") {

                        foundAccount.balance -= findTransaction.transactionAmount;

                    }
                    findTransaction.save();
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
            res.redirect('/transactions');
        }
    });
});









/* Exporting out */
module.exports = router