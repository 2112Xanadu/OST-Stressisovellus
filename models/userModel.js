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
            "SELECT userid, name FROM useresimerkki WHERE userid = ?",
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
        const [rows] = await promisePool.execute("SELECT * FROM useresimerkki WHERE email = ?;", params);
        return rows;
    } catch (e) {
        console.log("error", e.message);
    }
};


/* const cats = [
    {
        id: '1',
        firstname: 'Onerva',
        lastname: 'Onnela',
        studentid: '1111',
        birthdate: '31/12/2005',
        email: 'onerva@metropolia.fi',
        password: 'Test1234'
    },
    {
        id: '2',
        firstname: 'Ilona',
        lastname: 'Iloinen',
        studentid: '2222',
        birthdate: '19/12/2000',
        email: 'ilona@metropolia.fi',
        password: 'Testii1234'
    },
]; */

module.exports = {
    // cats,
    getAllUsers,
    getUser,
    getUserLogin
};