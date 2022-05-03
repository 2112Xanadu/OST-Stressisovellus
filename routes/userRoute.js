'use strict';

// Based on course material (source: https://github.com/patrick-ausderau/wop)
// This file is for User route which will lead user actions
// Creating variables for node modules and route.

const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const { body } = require('express-validator');

// Routes
router.route('/')
    //.get(userController.user_list_get)
    .get(userController.user_get)
    .put((req, res) => {
        res.send('From this endpoint you can edit users.');
    });

router.route('/:id')
    .delete((req, res) => {
        res.send(`From this endpoint you can delete user with id ${req.params.id}.`);
    });

// Check token
router.get('/token', userController.checkToken);

// Export router
module.exports = router;
