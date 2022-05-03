"use strict";

const pool = require("../database/db");
const promisePool = pool.promise();

//Insert stress questionnaire result into the database
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

// Get users latest stress result
const getUserResult = async (id) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT result, comment, dateAndTime FROM stress WHERE userid = ?",
      [id]
    );
    return rows;
  } catch (e) {
    console.error("ERROR, stress model get result by id", e.message);
  }
};

module.exports = {
  insertStressResult,
  getUserResult,
};
