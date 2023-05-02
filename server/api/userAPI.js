const express = require('express');
const router = express.Router();
const db = require('../database/db.js');
const sha256 = require('crypto-js/sha256');


// API/LOGINUSER -- takes in a user's information, checks the database, and sends
//                  a confirmation or denial if their information is correct
router.post('/', (req,res)=>{
    const email = req.body.email;
    const password = sha256(req.body.password).toString();

    const sqlSelect = "SELECT * FROM budgitdb.users WHERE email = ? AND password = ?;"
    db.query(sqlSelect, [email, password], (err, result) => {
        if (err) {
            res.send({err: err});
        }
        if (result.length > 0) {
            res.send(result);
        } else {
            console.log("could not find user");
        }
    });
});

module.exports = router;