"use strict";

const stressModel = require("../models/stressModel");

const stress_post = async (req, res) => {
  const stressResult = req.body;
  const stressResultId = await stressModel.insertStressResult(stressResult);
  res.json({ message: `Stress result id:  ${stressResultId}` });
};

const stress_result_get = async (req, res) => {
  try {
    const result = await stressModel.getUserResult(req.params.id);
    res.json(result);
  } catch (e) {
    // next(e);
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
