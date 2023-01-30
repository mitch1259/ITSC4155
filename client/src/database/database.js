const { createPool } = require('mysql');

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "sampledb",
    connectionLimit: 10
});

pool.query(`SELECT * FROM sampledb.user`, (err, res) => {
    if (err) {
        return console.log(err);
    } else {
        return console.log(res);
    }
});