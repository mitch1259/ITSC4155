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


//UPDATE GOAL USING THE GOAL ID FROM THE USER
//API/UPDATEGOAL/GOALID --

router.put('/:goalId',(req,res)=>{
    const title=goal.body.title;
    const savings=goal.body.savings;
    const startingAmount=goal.body.startingAmount;
    const startDate=goal.body.startDate;
    const endDate=goal.body.endDate;
    const description= goal.body.description;


    const updateGoalSqlInsert="update budgitdb.goal set title = ?, saving = ?, startingAmount = ?, startDate = ? WHERE goalId = ?";

    db.query(updateGoalSqlInsert,[title,savings,startingAmount,startDate,endDate,description],(errs,result) =>{
        if(err){
            console.log(err)
        }
        else{
            console.log(result);
            res.send(result);
        }
    });
});




//Delete GOAL USING GOAL ID 
router.delete('/:goalId',(goal,res)=>{

    const goalId=goal.body.goalId;
    const deleteGoalSql="DELETE FROM budgitdb.goal where goalId = ?;"


    db.query(deleteGoalSql,[goalId],(err,result) =>{
        if(err){
            res.send({err: err});
        }
        if(result){
            res.send(result);
        }
        else{
            console.log("Item does not exist");
        }
    });
});



//get a single goal object from server

router.get('/:goalId',(goal,res) =>{
    const goalId=goal.body.goalId;

    const getGoalById="select * from budgitdb.goal where goalId= ?"

    db.query(getGoalById,[goalId],(err,result) =>{
        if(goalId==undefined){
            console.log('user is underdefined')
        }
        else{
            res.send(result)
        }
    })
})

module.exports=router;
