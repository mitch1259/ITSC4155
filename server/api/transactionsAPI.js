const express = require('express');
const router = express.Router();
const db = require('../database/db.js');
const sha256 = require('crypto-js/sha256');


// Gets all transactions from the transactions table
router.get('/', (req,res)=>{
    const sqlQuery = "SELECT * FROM budgitdb.transactions;"
    db.query(sqlQuery, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }  
    })
});

module.exports = router;