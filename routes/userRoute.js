'use strict';

const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const { body } = require('express-validator');

router.route('/')
    .get(userController.user_list_get)
    .put((req, res) => {
        res.send('From this endpoint you can edit users.');
    });
router.get('/token', userController.checkToken);

module.exports = router;