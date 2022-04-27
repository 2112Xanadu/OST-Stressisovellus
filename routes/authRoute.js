'use strict';


// Creating variables for node modules and route.

const express = require('express');
const { body, sanitizeBody } = require('express-validator');
const router = express.Router();
const { login, user_post, logout } = require('../controllers/authController.js');

router.post('/login', login);
router.post('/register',
    [
        body('firstname').isLength({ min: 3 }),
        body('lastname').isLength({ min: 3 }),
        body('studentid').isLength({ min: 4 }),
        body('dateOfBirth').isDate({ min: "1950-01-01", max: "2004-12-31" }),
        body('email').isEmail(),
        body('password').matches('(?=.*[A-Z]).{8,}'),
        sanitizeBody('firstname').escape(),
    ],
    user_post
);
router.get('/logout', logout);

module.exports = router;
