"use strict";

const { application } = require("express");
const pool = require("../database/db");
const { httpError } = require("../utils/errors");
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from esimerkkiuser table).
    const [rows] = await promisePool.query(
      "SELECT userid, firstname, lastname FROM useresimerkki"
    );
    return rows;
  } catch (e) {
    console.error("error", e.message);
    const err = httpError("sql error", 500);
    throw err;
    //next(err); TODO: fix foe next week.  next can only be called by controller
  }
};

const getUser = async (id) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT userid, firstname, lastname, studentid, dateOfBirth, email FROM useresimerkki WHERE userid = ?",
      [id]
    );
    return rows[0];
  } catch (e) {
    console.error("user model get by id", e.message);
  }
};

const getUserLogin = async (params) => {
  try {
    console.log(params);
    const [rows] = await promisePool.execute(
      "SELECT * FROM useresimerkki WHERE email = ?;",
      params
    );
    return rows;
  } catch (e) {
    console.log("error", e.message);
  }
};

const insertUser = async (params) => {
  console.log("We are in User Model - insertUser (line 46)");
  try {
    const [rows] = await promisePool.query(
      "INSERT INTO useresimerkki(firstname, lastname, studentid, dateOfBirth, email, password) VALUES (?, ?, ?, ?, ?, ?)",
      params
    );
    //console.log('user model insert successfully', rows);
    console.log("user model insert successful. ID:", rows.insertId);
    return rows.insertId;
  } catch (e) {
    console.error("user model insert", e.message);
  }
};

// Exporting functions.
module.exports = {
  getAllUsers,
  getUser,
  getUserLogin,
  insertUser,
};
