"use strict";

// Based on course material (source: https://github.com/patrick-ausderau/wop)
// Creating variables for node modules and route.

const express = require("express");
const { body, sanitizeBody } = require("express-validator");
const router = express.Router();

const { login, user_post, logout, } = require("../controllers/authController.js");

// Login route
router.post("/login", login);

// Register route
router.post("/register",
    [
        body("firstname").isLength({ min: 2 }),
        body("lastname").isLength({ min: 2 }),
        body("studentid").isLength({ min: 7 }),
        body("dateOfBirth").isDate({ min: "1950-01-01", max: "2004-12-31" }),
        body("email").isEmail().matches(".+@metropolia.fi"),
        body("password").matches("(?=.*[A-Z]).{8,}"),
        sanitizeBody("firstname").escape(),
    ],
    user_post
);

// Log out route
router.get("/logout", logout);

// Export router
module.exports = router;
