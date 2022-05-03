"use strict";

// Based on course material (source: https://github.com/patrick-ausderau/wop)
// Auth controller

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
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user, process.env.JWT_SECRET);
            return res.json({ user, token });
        });
    })(req, res);
};

const user_post = async (req, res) => {
    console.log("user post form data", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("user post form error", errors.array());
        res.status(400).json({ message: "Syöttämäsi tiedot olivat puutteellisia. Rekisteröityminen epäonnistui." });
        return;
    }

    const params = [
        req.body.firstname,
        req.body.lastname,
        req.body.studentid,
        req.body.dateOfBirth,
        req.body.email,
        await bcrypt.hash(req.body.password, 10),
    ];
    const userid = await userModel.insertUser(params);
    res.json({ message: `user inserted with ${userid}.` });
    //console.log('line 50: Registration was successful');
};

const logout = (req, res) => {
    req.logout;
    res.json({ message: 'logout' });
}

module.exports = {
    login,
    user_post,
    logout,
};

