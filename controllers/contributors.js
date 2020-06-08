const express = require('express');
const router = express.Router();
const db = require('../models');


// about route
router.get('/', function (req, res) {
    db.Contributors.find({}, function (error, findContributors) {
    if (error) {
    console.log(error);
    
} else {
    const context = { contributors: findContributors }
    res.render('contributors/index', context);
    }
    });
    });

    //create route
        router.post('/', function (req, res) {
            const contributors = {
                name: req.body.name,
                about: req.body.about,
 }

 db.Contributors.create(contributors, function (error, createdContributors) {
    if (error) {
        console.log(error);
    } else {
        res.redirect('/contributors, index');
    }
});
});



    module.exports = router;