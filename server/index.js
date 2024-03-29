const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const morgan = require('morgan');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "sampledb2"
});

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

function add(n1, n2) {
    return n1 + n2;
}

module.exports = add;


app.get('/api/get', (req, res) => {
    const sqlInsert = "SELECT * FROM sampledb2.user";

    db.query(sqlInsert, (err, result) => {
        console.log(result);
        res.send(result);
    });
});


app.post("/api/insert", (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const sqlInsert = "INSERT INTO sampledb2.user (first_name, last_name) VALUES (?,?);";
    db.query(sqlInsert, [firstName, lastName], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
});


app.listen(3002, () => {
    console.log('running on port 3002');
});