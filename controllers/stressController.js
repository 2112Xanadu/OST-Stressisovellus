"use strict";

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

const checkToken = (req, res, next) => {
  if (!req.user) {
    next(new Error("token not valid"));
  } else {
    res.json({ user: req.user });
  }
};

module.exports = {
  stress_post,
  stress_result_get,
  checkToken,
};
