"use strict"

// Kubios controller for get function.
// Creating variables for node modules and kubios model.

const kubiosModel = require("../models/kubiosModel");
const { validationResult, validationResults } = require("express-validator");

// Async function for getting all the diaries from database.
const kubios_fetch = async () => {
    const kubios = await kubiosModel.kubiosFetch();
    console.log("AreEEEEEEEE we in kubios_fetch function?");
    console.log("kubios controller get user information", kubios);
    //res.json(diaries);
};

const kubios_fetch_measurement = async (req, res) => {
    //const user_id =req.user.user_id;
    //const kubios_measurements = await kubiosModel.kubiosFetchMeasurement(user_id);
    const kubios_measurements = await kubiosModel.kubiosFetchMeasurement();
    console.log("kubios controller get measurement information", kubios_measurements);
    res.json(kubios_measurements);
};

module.exports = {
    kubios_fetch,
    kubios_fetch_measurement,
};
