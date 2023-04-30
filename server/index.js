const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();
const userAPI = require('./api/userAPI.js');
const registerUser = require('./api/registerUser.js');
const savingGoal = require('./api/goalApi.js');
const sha256 = require('crypto-js/sha256');


const buffer = require('buffer');

// const updateGoal=require("./api/goalApi.js")

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "budgitdb"
});

// middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// api calls (in their respective files/api locations)
app.use('/api/loginUser', userAPI);
app.use('/api/registerUser', registerUser);
app.use('/api/createGoal/',savingGoal);
// app.use('/api/createGoal/deleteGoal',deleteGoal)
// app.use('/api/createGoal/updateGoal/:goalId',updateGoal)



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
           res.send(result);
        }
    });
});

// API/search/user -- search database for users matching email
app.get('/api/get-emails', (req, res) => {
    const sqlQuery = "SELECT email FROM budgitdb.users";
    
    db.query(sqlQuery, (err, results) => {
        if(err) {
            console.error(err);
            res.status(500).send('Internal server error');
            return;
        }

        const emailArray = results.map((result) => result.email);

        res.send(emailArray);
    });
});



    // const sqlInsert = "INSERT INTO budgitdb.users (firstName, lastName, email, password) VALUES (?,?,?,?);"
    // db.query(sqlInsert, [firstName, lastName, email, password], (err, result) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log(result);
    //     }
    // });

// app.post('/api/loginUser', (req,res)=>{
//     const email = req.body.email;
//     const password = req.body.password;
//     console.log('received post', email, password);
//     // console.log(email, password);

//     const sqlSelect = "SELECT * FROM budgitdb.users WHERE email = ? AND password = ?;"
//     db.query(sqlSelect, [email, password], (err, result) => {
//         if (err) {
//             res.send({err: err});
//         }

//         if (result.length > 0) {
//             res.send(result);
//         } else {
//             console.log('user not found');
//         }
//     });
// });

// API/GET/CURRENTUSER -- get the current user by their userID
app.post('/api/get/currentUser', (req, res) => {
    let userID = req.body.userID;
    console.log(userID);
    console.log('request: ', req.body);

    const sqlQuery = "SELECT * FROM budgitdb.users WHERE userID = ?;";
    db.query(sqlQuery, [userID], (err, result) => {
        if (userID === undefined) {
            console.log('user is undefined');
        } else {
            res.send(result);
        }
    });
});
app.post('/api/deleteUser', (req,res)=>{
    // const email = req.body.email;
    const userID = req.body.userID
    const sqlInsert = "DELETE FROM budgitdb.users WHERE userID = ?;"
    db.query(sqlInsert,[userID], (err, result) => {
        if (err) {
            res.send({err: err});
        }
        if (result) {
            res.send(result);
        } else {
            console.log("no results found");
        }
    });
});

// API/GET/CURRENTUSER/RECENTTRANSACTIONS -- get the user's boards
app.post('/api/get/currentUser/allBoards', (req, res) => {
    let userID = req.body.userID;

    const sqlQuery = "SELECT * FROM budgitdb.boards WHERE userID = ?;"
    db.query(sqlQuery, [userID], (err, result) => {
        if (result) {
            res.send(result);
        } else {
            console.log("no results found");
        }
        
    });
});

// API/GET/CURRENTUSER/RECENTTRANSACTIONS -- get the user's boards
app.post('/api/get/currentUser/recentTransactions', (req, res) => {
    let userID = req.body.userID;

    const sqlQuery = "SELECT * FROM budgitdb.transactions WHERE userID = ? ORDER BY createDate DESC LIMIT 2;"
    db.query(sqlQuery, [userID], (err, result) => {
        if (result) {
            res.send(result);
        } else {
            console.log("no results found");
        }
        
    });
});
app.post('/api/get/profileTransactions/recentTransactions', (req, res) => {
    let userID = req.body.userID;

    const sqlQuery = "SELECT * FROM budgitdb.transactions WHERE userID = ? ORDER BY createDate DESC LIMIT 15;"
    db.query(sqlQuery, [userID], (err, result) => {
        if (result) {
            res.send(result);
        } else {
            console.log("no results found");
        }
        
    });
});

app.post('/api/changeUserInfo', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const userID = req.body.userID;
    const profilePicture = req.body.profilePicture;
    // let sqlInsert = "UPDATE budgitdb.users SET firstName = '${firstName}', lastName = '${lastName}', email = '${email}', profilePicture = '${profilePicture}'";
    //Query to select user by id
    const selectUserQuery = 'SELECT * FROM budgitdb.users WHERE userID = ?';
    //Query to update user
    const updateUserQuery = "UPDATE budgitdb.users SET firstName = ?, lastName = ?, email = ?, password = ?, profilePicture = ? WHERE userID = ?";
    console.log(firstName, lastName, email, password, profilePicture);
    //select user by id
    db.query(selectUserQuery, [userID], (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).send('Server Error');
        } else {
            console.log('select query data: ', result);
            if(result.length === 0) {
                res.status(404).send('User not found');
            } else {
                const user = result[0];
                const oldPassword = user.password;
                console.log('user: ', user, 'oldPassword: ', oldPassword);
                //if password not provided, use the old password
                const newPassword = password ? sha256(password).toString() : oldPassword;
                console.log('new password: ', newPassword);
                db.query(updateUserQuery, [firstName, lastName, email, newPassword, profilePicture, userID], (err, result => {
                    if(err) {
                        console.log(err);
                    } else {
                        res.send('User updated successfully');
                    }
                }))
            }
        }
    })
});



// APT/GET/CURRENTUSERINFO
app.post('/api/get/currentUserInfo', (req, res) => {
    let userID = req.body.userID;

    const sqlQuery = "SELECT b.boardID, b.boardName, b.boardDescription, b.recurTransactions, b.remainBudget, t.transactionID, t.category, t.amount, t.createDate, t.label, t.isRecurrent FROM budgitdb.users u JOIN budgitdb.boards b ON u.userID = b.userID JOIN budgitdb.transactions t ON b.boardID = t.boardID WHERE u.userID = ?;"
    db.query(sqlQuery, [userID], (err, result) => {
        if (result) {
            res.send(result);
        } else {
            console.log("no results found");
        }
    })
});

// API/NEWTRANSACTION
app.post('/api/newTransaction', (req, res) => {
    let boardID = req.body.boardID;
    let userID = req.body.userID;
    let category = req.body.category;
    let label = req.body.label;
    let createDate = req.body.createDate;
    let amount = req.body.amount;
    let isRecurrent = req.body.isRecurrent;

    const sqlInsert = "INSERT INTO budgitdb.transactions (`boardID`, `userID`, `category`, `amount`, `createDate`, `label`, `isRecurrent`) VALUES (?,?,?,?,?,?,?);"
    db.query(sqlInsert, [boardID, userID, category, amount, createDate, label, isRecurrent], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            res.send('successful insert');
        } else {
            res.send('something bad happened');
        }
    });
});

app.post('/api/transaction/submit', (req, res) => {

    const boardID = req.body.boardID;
    const userID = req.body.userID;
    const category = req.body.category;
    const amount = req.body.amount;
    const createDate = req.body.createDate;
    const label = req.body.label;
    const isRecurrent = req.body.isRecurrent;

    //const sqlInsert = "INSERT INTO budgitdb.transactions (boardID, userID, category, amount, createDate, label, isRecurrent) VALUES (?,?,?,?,?,?,?);"
    const sqlInsert = "CALL budgitdb.insertionSubmit (?,?,?,?,?,?,?);"
    db.query(sqlInsert, [boardID, userID, category, amount, createDate, label, isRecurrent], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
});
app.get('/api/get/board/transactions', (req, res) => {
    
    const board = req.query.board;
    const lowEnd = req.query.lowEnd;
    const highEnd = req.query.highEnd;
    const category = req.query.category;

    //category 0, for this purpose, is all categories
    if (category != 0 ) {
    const sqlSelect = "SELECT * FROM budgitdb.transactions WHERE category = ? AND boardID = ? AND createDate BETWEEN ? AND ? ORDER BY createDate;"
    db.query(sqlSelect, [category, board, lowEnd, highEnd], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
    } else {
    const sqlSelect = "SELECT * FROM budgitdb.transactions WHERE boardID = ? AND createDate BETWEEN ? AND ? ORDER BY createDate;"
    db.query(sqlSelect, [board, lowEnd, highEnd], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
    }
});


//Delete GOAL USING GOAL ID 
app.post('/api/createGoal/deleteGoal/',(goal,res)=>{
    const goalId=goal.body.goalId;
    const deleteGoalSql="delete FROM budgitdb.goal where goalId = ?;"


    db.query(deleteGoalSql,[goalId],(err,result) =>{
        if(err){
            console.log('there was a error in deleting')
            res.send({err: err});
        }
        if(result){
            console.log("successful deletion")
            res.send(result);
        }
        else{
            console.log("Item does not exist");
        }
    });
});


//UPDATE GOAL USING THE GOAL ID FROM THE USER
//API/UPDATEGOAL/GOALID --
app.put('/api/createGoal/:goalId',(goal,res)=>{
    const goalId=goal.body.goalId
    const title=goal.body.title;
    const savings=goal.body.savings;
    const startingAmount=goal.body.startingAmount;
    const startDate=goal.body.startDate;
    const endDate=goal.body.endDate;
    const description= goal.body.description;


    const updateGoalSqlInsert="update budgitdb.goal set title = ?, saving = ?, startingAmount = ?, startDate = ? WHERE goalId = ?";

    db.query(updateGoalSqlInsert,[goalId,title,savings,startingAmount,startDate,endDate,description],(errs,result) =>{
        if(err){
            console.log(errs)
            console.log("update did not go through")
        }
        else{
            console.log(result);
            res.send(result);
        } 
    })
});

app.post('/api/get/currentBoard', (req, res) => {
    let boardID = req.body.boardId;
    console.log("BOARDID: ", boardID);
    const sqlQuery = "SELECT * FROM budgitdb.boards WHERE boardID = ?"
    db.query(sqlQuery, [boardID], (err, result) => {
        if (result) {
            res.send(result);
        } else {
            console.log("no results found");
        }
    })
});

app.get('/api/get/board/budget', (req, res) => {
    const id = req.query.id;

    const sqlSelect = "SELECT * FROM budgitdb.boards WHERE boardID = ?";
    db.query(sqlSelect, [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

app.post('/api/transaction/delete', (req, res) => {
    const id = req.body.id;

    const sqlDelete = "DELETE FROM budgitdb.transactions WHERE transactionID = ?;"
    db.query(sqlDelete, [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
});

app.post('/api/board/delete', (req, res) => {
    const id = req.body.id;
    console.log("received id: ", id);
    const sqlDelete = "DELETE FROM budgitdb.boards WHERE boardID = ?;"
    db.query(sqlDelete, [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("deleted board: ", result);
            res.send(result);
        }
    });
});



//get a single goal object from server
app.get('/api/createGoal/:goalId',(goal,res) =>{
    const goalId=goal.body.goalId;

    const getGoalById="select * from budgitdb.goal where goalId= ?;";

    db.query(getGoalById,[goalId],(err,result) =>{
        if(goalId==undefined){
            console.log('goal is underdefined for getting single goal')
            console.log(err)
        }
        else{
            res.send(result)
        }
    });
});


app.post('/api/board/create', (req, res) => {
    const id = req.body.userID;
    const name = req.body.name;
    const description = req.body.description;
    const budget = req.body.budget;

    const sqlInsert = "INSERT INTO budgitdb.boards (`userID`, `boardName`, `boardDescription`, `recurTransactions`, `remainBudget`) VALUES (?,?,?,?,?);"
    db.query(sqlInsert, [id, name, description, "", budget], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
});

app.post('/api/boards/getRecentTwo', (req, res) => {
    const boardID = req.body.boardID;
    const currentDate = req.body.currentDate;

    const sqlQuery = "SELECT * FROM budgitdb.transactions WHERE boardID = ? AND createDate <= ? ORDER BY createDate DESC LIMIT 2";
    db.query(sqlQuery, [boardID, currentDate], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("result: ", result);
            res.send(result);
        }
    });
});



app.listen(3002, () => {
    console.log('running on port 3002');
});