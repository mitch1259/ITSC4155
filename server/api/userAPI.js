const express = require('express');
const router = express.Router();
const db = require('../database/db.js');


// API/LOGINUSER -- takes in a user's information, checks the database, and sends
//                  a confirmation or denial if their information is correct
router.post('/', (req,res)=>{
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



// API/REGISTERUSER -- takes in the information from the request sent from the client, and stores
// //                      that into the database
// app.post('/api/registerUser', (req, res) => {
    
//     const firstName = req.body.firstName;
//     const lastName = req.body.lastName;
//     const email = req.body.email;
//     const password = req.body.password;

//     const sqlInsert = "INSERT INTO budgitdb.users (firstName, lastName, email, password) VALUES (?,?,?,?);"
//     db.query(sqlInsert, [firstName, lastName, email, password], (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(result);
//             res.send("successful user registration");
//         }
//     });
// });

module.exports = router;