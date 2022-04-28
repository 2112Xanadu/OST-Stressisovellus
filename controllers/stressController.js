"use strict";

const stressModel = require("../models/stressModel");

const stress_post = async (req, res) => {
  console.log("post route with html from data?", req.body);
  const stressResult = req.body;
  const stressResultId = await stressModel.insertStressResult(stressResult);
  res.json({ message: `Stress result id:  ${stressResultId}` });
};

module.exports = {
  stress_post,
};
