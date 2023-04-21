// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const app = express();
// const mysql = require('mysql');
// const morgan = require('morgan');




// // const db = mysql.createPool({
// //     host: "localhost",
// //     user: "root",
// //     password: "password",
// //     database: "budgitdb"
// // });

// app.use(cors());
// app.use(morgan('tiny'));
// app.use(express.json());
// app.use(bodyParser.urlencoded({extended: true}));




// app.post('/api/createGoal', (goal,res)=>{
//     const title=goal.body.title;
//     const savings=goal.body.savings;
//     const startingAmount=goal.body.startingAmount;
//     const startDate=goal.body.startDate;
//     const endDate=goal.body.endDate;
//     const description= goal.body.description;
    
//     const createGoalSqlInsert="INSERT INTO budgitdb.goal (title,savings,startingAmount,startDate,endDate,description) values (?,?,?,?,?,?);"


//     db.query(createGoalSqlInsert,[title,savings,startingAmount,startDate,endDate,description],(err,result)=>{
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log(result);
//         }
//     });

// });