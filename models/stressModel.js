"use strict";

const pool = require("../database/db");
const promisePool = pool.promise();

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

// Get latest result from single user
const getUserResult = async (id) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT result FROM stress WHERE userid = 1",
      [id]
    );
    return rows[0];
  } catch (e) {
    console.error("stress model get result by id", e.message);
  }
};

module.exports = {
  insertStressResult,
  getUserResult,
};
