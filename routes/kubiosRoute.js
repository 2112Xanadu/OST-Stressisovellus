"use strict"

//* CURRENTLY FETCHING DATA FROM JSON FILE
// This file is for Kubios route which will lead user's actions
// to right path

// Creating variables for node modules and route.
const express = require("express");
const kubiosRoute = express.Router();
const kubiosController = require("../controllers/kubiosController");

// Creating body which will be used to get or add information to the html webpage.
const { body } = require("express-validator");

// Defining path for route with Kubios.
//kubiosRoute.get("/", kubiosController.kubios_fetch);
//kubiosRoute.get("/", kubiosController.kubios_fetch_measurement);

// The route which will do get function for webpage when fetching for Kubios information with
// or without specific id.
kubiosRoute.route("/")
    //.get(kubiosController.kubios_fetch)
    .get(kubiosController.kubios_fetch_measurement);

// Export router
module.exports = kubiosRoute;
