"use strict";

// Based on course material (source: https://github.com/patrick-ausderau/wop)
// User controller for get functions.
// Creating variables for node modules and kubios model.

const userModel = require("../models/userModel");
const { validationResult } = require("express-validator");

// User list get for displaying all users
const user_list_get = async (req, res) => {
    const users = await userModel.getAllUsers();
    console.log("user controller get all", users);
    res.json(users);
};

// User post for new user registration
const user_get = async (req, res) => {
    try {
        console.log("user controller get", req.user);
        const user = await userModel.getUser(req.user.userid);
        res.json(user);
    } catch (e) {
        next(e);
    }
};

// Token check
const checkToken = (req, res, next) => {
    if (!req.user) {
        next(new Error("token not valid"));
    } else {
        res.json({ user: req.user });
    }
};

// Exports
module.exports = {
    user_list_get,
    user_get,
    checkToken,
};