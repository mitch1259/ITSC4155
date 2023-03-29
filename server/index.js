const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const morgan = require('morgan');
const userAPI = require('./api/userAPI.js');

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
            console.log(result)
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

    const sqlInsert = "SELECT * FROM budgitdb.users WHERE email = ? AND password = ?;"
    db.query(sqlInsert, [email, password], (err, result) => {
        if (err) {
            res.send({err: err});
        }

        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({message: "Username or password is wrong, please try again!"})
        }
        
    });
});

app.post('/api/deleteUser', (req,res)=>{
    // const email = req.body.email;

    const sqlInsert = "DELETE FROM budgitdb.users WHERE email = 'test@gmail.com';"
    db.query(sqlInsert, (err, result) => {
        if (err) {
            res.send({err: err});
        }        
    });
});

app.post('/api/changeUserInfo', (req, res) => {
    
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    const sqlInsert = "UPDATE budgitdb.users SET firstName = ?, lastName = ?, email = ?, password = ? WHERE email = 'test@gmail.com'";
    db.query(sqlInsert, [firstName, lastName, email, password], (err, result) => {
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