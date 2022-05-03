"use strict";

// Based on course material (source: https://github.com/patrick-ausderau/wop)
// Stress controller for get functions.
// Creating variables for node modules and stress model.

const stressModel = require("../models/stressModel");

//POST function
const stress_post = async (req, res) => {
  const stressResult = req.body;
  const stressResultId = await stressModel.insertStressResult(stressResult);
  res.json({ message: `Stress result id:  ${stressResultId}` });
};

//GET function
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
  checkToken,
};
