"use strict";

const express = require("express");
const stressController = require("../controllers/stressController");
const stressRoute = express.Router();
const { body } = require("express-validator");
stressRoute.route("/:userid").get(stressController.stress_result_get);

stressRoute
  .route("/")
  .post(
    body("stressid").notEmpty(),
    body("result").notEmpty(),
    stressController.stress_post
  );

stressRoute.get("/token", stressController.checkToken);

module.exports = stressRoute;
