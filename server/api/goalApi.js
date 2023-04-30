const express = require('express');
const router = express.Router();
const db = require('../database/db.js');



// API/CREATEGOAL --
router.post('/', (goal,res)=>{
    const title=goal.body.title;
    const savings=goal.body.savings;
    const startingAmount=goal.body.startingAmount;
    const startDate=goal.body.startDate;
    const endDate=goal.body.endDate;
    const description= goal.body.description;
    
    const createGoalSqlInsert="INSERT INTO budgitdb.goal (title,savings,startingAmount,startDate,endDate,description) values (?,?,?,?,?,?);"


    db.query(createGoalSqlInsert,[title,savings,startingAmount,startDate,endDate,description],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
            res.send(result);
        }
    });

});

//get all goals
router.get('/',(goal,res) =>{

    const getAllGoals= 'select * from budgitdb.goal';

    db.query(getAllGoals,(err,result)=>{
        if(err){
            console.log(err)
            
        }
        else{
            console.log(result)
            res.send(result)
        }
    })
})


module.exports=router;
