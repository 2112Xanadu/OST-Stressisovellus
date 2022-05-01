"use strict";

const userModel = require("../models/userModel");
const { validationResult } = require("express-validator");

const user_list_get = async (req, res) => {
  const users = await userModel.getAllUsers();
  console.log("user controller get all", users);
  res.json(users);
};

const user_get = async (req, res) => {
  try {
    console.log("user controller get", req.user);
    const user = await userModel.getUser(req.user.userid);
    res.json(user);
  } catch (e) {
    next(e);
  }
};

const checkToken = (req, res, next) => {
  if (!req.user) {
    next(new Error("token not valid"));
  } else {
    res.json({ user: req.user });
  }
};

module.exports = {
  user_list_get,
  user_get,
  checkToken,
};
