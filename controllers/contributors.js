const express = require('express');
const router = express.Router();
const db = require('../models');

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

    





    module.exports = router;