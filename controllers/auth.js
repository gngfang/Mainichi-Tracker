const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../models');

// register form
router.get('/register', function (req, res) {
    res.render('auth/register')
});































module.exports = router;