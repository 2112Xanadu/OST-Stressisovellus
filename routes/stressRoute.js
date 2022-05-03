"use strict";

// Based on course material (source: https://github.com/patrick-ausderau/wop)
// https://expressjs.com/en/api.html#req
// This file is for stress route which will lead user actions through stress survey
// Creating variables for node modules, stress controller and route.

const express = require("express");
const stressController = require("../controllers/stressController");
const stressRoute = express.Router();
const { body } = require("express-validator");

// Routes
stressRoute.route("/:userid").get(stressController.stress_result_get);

stressRoute
  .route("/")
  .post(
    body("stressid").notEmpty(),
    body("result").notEmpty(),
    stressController.stress_post
  );

// Check token
stressRoute.get("/token", stressController.checkToken);

// Export router
module.exports = stressRoute;
