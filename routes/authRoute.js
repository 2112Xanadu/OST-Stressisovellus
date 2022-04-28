'use strict';

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
        body('dateOfBirth').isDate(),
        body('email').isEmail(),
        body('password').matches('(?=.*[A-Z]).{8,}'),
        sanitizeBody('name').escape(),
    ],
    user_post
);
router.get('/logout', logout);

module.exports = router;
