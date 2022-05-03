"use strict";

// Based on course material (source: https://github.com/patrick-ausderau/wop)
// Auth controller
// Creating variables for node modules and user model.

require("dotenv").config();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const userModel = require("../models/userModel");

// User login with password authentication
const login = (req, res) => {
    console.log("line 11: login", req.body);
    // TODO: add passport authenticate
    passport.authenticate("local", { session: false }, (err, user, info) => {
        console.log('auth login error', err);
        console.log('auth login info', info);
        // Checks errors in inputs
        if (err || !user) {
            return res.status(400).json({
                message: "Syöttämäsi salasana tai käyttäjätunnus on väärä",
                user: user,
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            // generates a signed json web token with the contents of user object and returns it as response
            const token = jwt.sign(user, process.env.JWT_SECRET);
            return res.json({ user, token });
        });
    })(req, res);
};

// User post for registrating a new user
const user_post = async (req, res) => {
    console.log("user post form data", req.body);
    // Checks errors in sign up form
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("user post form error", errors.array());
        res.status(400).json({ message: "Syöttämäsi tiedot olivat puutteellisia. Rekisteröityminen epäonnistui." });
        return;
    }

    // Params matched with our database
    const params = [
        req.body.firstname,
        req.body.lastname,
        req.body.studentid,
        req.body.dateOfBirth,
        req.body.email,
        // Hashing user's password
        await bcrypt.hash(req.body.password, 10),
    ];
    // Inserts a new user via User Model
    const userid = await userModel.insertUser(params);
    // Informs the user if the registration was successful
    res.json({ message: `Rekisteröinti onnistui. ${userid}.` });
};

// Log out for logging out
const logout = (req, res) => {
    req.logout;
    res.json({ message: 'logout' });
}

// Exporting functions
module.exports = {
    login,
    user_post,
    logout,
};

