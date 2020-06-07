/* Bring express and router */
const express = require('express');
const router = express.Router();
const db = require('../models');


/* Route */

// Index Route

router.get('/', function (req, res) {
    db.Account.find({ user: req.session.currentUser.id }, function (error, allAccount) {
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
    const accounts = {
        accountNumber: req.body.accountNumber,
        accountType: req.body.accountType,
        institution: req.body.institution,
        balance: req.body.balance,
        description: req.body.description,
        user: req.session.currentUser.id
    }
    db.Account.create(accounts, function (error, createdAccount) {
        if (error) {
            res.send({ message: "Internal Server Error" })
        } else {
            res.redirect('/accounts');
        }
    });
});



// Show Route

router.get('/:id', function (req, res) {
    db.Account.findById(req.params.id).populate("transactions").exec(function (error, showAccount) {
        if (error) {
            res.send({ message: "Internal Server Error" })
        } else {
            const context = { account: showAccount };
            res.render('account/show', context);
        }

    })

});

// Edit route


router.get('/:id/edit', function (req, res) {
    db.Account.findById(req.params.id, function (error, editAccount) {
        if (error) {
            res.send({ message: "Internal Server Error" })

        } else {
            const context = { account: editAccount }
            res.render('account/edit', context)
        }

    })
})

// Update Route

router.put('/:id', function (req, res) {
    db.Account.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (error, updatedAccount) {
        if (error) {
            res.send({ message: "Internal Server Error" })

        } else {
            res.redirect(`/accounts/${updatedAccount._id}`)
        }

    })
})


// Delete Route

router.delete('/:id', function (req, res) {
    db.Account.findByIdAndDelete(req.params.id, function (error, deletedAccount) {
        if (error) {
            console.log(error)
            res.send({ message: "Internal Server Error" })
        } else {
            db.Transaction.remove({
                // _id: {
                //     $in: deletedAccount.transactions
                // }
                accounts: deletedAccount._id
            }, function (error, deletedTransaction) {
                if (error) {
                    console.log(error)
                    res.send({ message: 'Internal Server Error' })
                } else {
                    res.redirect('/accounts')
                }
            }
            )

        }
    });
});


//About Route
router.get('/', function (req, res) {
    db.Contributors.find({}, function (error, findContributors) {
    if (error) {
    res.send({ message: "No Contributors" })
    } else {
    const context = { contributors: findContributors }
    res.render('/contributors, about.ejs', context);
    }
    });
    });







/* Exporting out */
module.exports = router