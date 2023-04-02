const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "budgitdb"
});

module.exports = db;