const express = require('express');
const router = express.Router();
const db = require('../database/db.js');
const sha256 = require('crypto-js/sha256');

// API/REGISTERUSER -- takes in the information from the request sent from the client, and stores
//                      that into the database
router.post('/', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = sha256(req.body.password).toString();
    // console.log(password);
    const sqlInsert = "INSERT INTO budgitdb.users (firstName, lastName, email, password) VALUES (?,?,?,?);"
    db.query(sqlInsert, [firstName, lastName, email, password], (err, result) => {
        if (err) {
            console.log("error: ", err);
        } else {
            console.log(result);
            res.send("successful user registration");
        }
    });
});

module.exports = router;