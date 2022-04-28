"use strict";

//const { application } = require("express");
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
    console.log("Success!", rows);
    return rows.insertId;
  } catch (e) {
    console.error("Problem:", e.message);
  }
};

module.exports = {
  insertStressResult,
};
