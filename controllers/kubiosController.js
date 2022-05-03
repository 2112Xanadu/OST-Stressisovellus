"use strict"

// Kubios controller for get function.
// Source: https://github.com/patrick-ausderau/wop
// Creating variables for node modules and kubios model.

const kubiosModel = require("../models/kubiosModel");
const { validationResult, validationResults } = require("express-validator");

// Async function for getting kubios data
const kubios_fetch = async () => {
    const kubios = await kubiosModel.kubiosFetch();
    //console.log("AreEEEEEEEE we in kubios_fetch function?");
    console.log("kubios controller get user information", kubios);
    //res.json(kubios);
};

const kubios_fetch_measurement = async (req, res) => {
    //const user_id =req.user.user_id;
    //const kubios_measurements = await kubiosModel.kubiosFetchMeasurement(user_id);
    const kubios_measurements = await kubiosModel.kubiosFetchMeasurement();
    console.log("kubios controller get measurement information", kubios_measurements);
    res.json(kubios_measurements);
};

// Exporting functions
module.exports = {
    kubios_fetch,
    kubios_fetch_measurement,
};
