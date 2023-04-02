const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const morgan = require('morgan');
const userAPI = require('./api/userAPI.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "budgitdb"
});

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

function add(n1, n2) {
    return n1 + n2;
}
module.exports = add;
// function authenicateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (token == null) return res.sendStatus(401);

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) {
//             return res.sendStatus(403);
//         }
//         req.user = user;
//         next();
//     })
// }



// API CALLS: each is labeled by GET or POST, telling you whether it's posting or retrieving data


// /API/GET -- sample boilerplate that can be used to to create your own API GET methods to the database
// For additional context, look at /client/src/pages/Home.js to see how it interacts with the front end
app.get('/api/get', (req, res) => {
    const sqlInsert = "SELECT * FROM sampledb2.user";

    db.query(sqlInsert, (err, result) => {
        console.log(result);
        res.send(result);
    });
});

// /API/INSERT -- sample boilerplate that can be used to create your own API POST methods to the database
// For additional context, look at /client/src/pages/Home.js to see how it interacts with the front end
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

// API/GET/USERS -- gets all users in the budgitdb.users table
app.get('/api/get/users', (req, res) => {
    const sqlQuery = "SELECT * FROM budgitdb.users";

    db.query(sqlQuery, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
});

// API/REGISTERUSER -- takes in the information from the request sent from the client, and stores
//                      that into the database
app.post('/api/registerUser', (req, res) => {
    
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    const sqlInsert = "INSERT INTO budgitdb.users (firstName, lastName, email, password) VALUES (?,?,?,?);"
    db.query(sqlInsert, [firstName, lastName, email, password], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
});

app.post('/api/loginUser', (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    console.log('received post', email, password);
    // console.log(email, password);

    const sqlSelect = "SELECT * FROM budgitdb.users WHERE email = ? AND password = ?;"
    db.query(sqlSelect, [email, password], (err, result) => {
        if (err) {
            res.send({err: err});
        }

        if (result.length > 0) {
            res.send(result);
        } else {
            console.log('user not found');
        }
    });
});

// API/GET/USERS -- gets all users in the budgitdb.users table
app.post('/api/get/currentUser', (req, res) => {
    let userID = req.body.userID;
    console.log(userID);
    console.log('request: ', req.body);

    const sqlQuery = "SELECT * FROM budgitdb.users WHERE userID = ?;";
    db.query(sqlQuery, [userID], (err, result) => {
        if (userID === undefined) {
            console.log('userID is fucking undefined');
        } else {
            res.send(result);
        }
    });
});




app.listen(3002, () => {
    console.log('running on port 3002');
});