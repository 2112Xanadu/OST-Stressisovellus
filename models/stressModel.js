"use strict";

// Based on course material (source: https://github.com/patrick-ausderau/wop)
// Stress model
// Creating variables for node modules.

const pool = require("../database/db");
const promisePool = pool.promise();

// Insert stress result
const insertStressResult = async (stressResult) => {
  try {
    const [rows] = await promisePool.query(
      "INSERT INTO stress (stressid, result, comment, userid) VALUES (?,?,?,?)",
      [
        stressResult.stressid,
        stressResult.result,
        stressResult.comment,
        stressResult.userid,
      ]
    );
    console.log("Stress result inserted!", rows);
    return rows.insertId;
  } catch (e) {
    console.error("You have a problem: ", e.message);
  }
};

// Get user's latest stress result
const getUserResult = async (id) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT result, comment, dateAndTime FROM stress WHERE userid = ?",
      [id]
    );
    return rows;
  } catch (e) {
    console.error("stress model get result by id", e.message);
  }
};

// Get user's comment
const getUserComment = async (id) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT comment FROM stress WHERE userid = ?",
      [id]
    );
    return rows;
  } catch (e) {
    console.error("stress model get result by id", e.message);
  }
};

// Exporting functions
module.exports = {
  insertStressResult,
  getUserResult,
  getUserComment,
};
