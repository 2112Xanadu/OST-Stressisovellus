"use strict";

// Based on course material (source: https://github.com/patrick-ausderau/wop)
// Stress controller for get functions.
// Creating variables for node modules and stress model.

const stressModel = require("../models/stressModel");
const { validationResult } = require("express-validator");

// Stress post for insertinf stress result
const stress_post = async (req, res) => {
  const stressResult = req.body;
  const stressResultId = await stressModel.insertStressResult(stressResult);
  res.json({ message: `Stress result id:  ${stressResultId}` });
};

// Stress result get for getting user's stress result by user's id
const stress_result_get = async (req, res) => {
  try {
    const result = await stressModel.getUserResult(req.user.userid);
    res.json(result);
  } catch (e) {
    console.log("erRRR controller", e.message);
  }
};

// Stress comment get for getting user's comment by user's id
const stress_comment_get = async (req, res) => {
  try {
    const result = await stressModel.getUserComment(req.user.userid);
    res.json(result);
  } catch (e) {
    console.log("erRRR controller", e.message);
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

// Exporting functions
module.exports = {
  stress_post,
  stress_result_get,
  stress_comment_get,
  checkToken,
};
