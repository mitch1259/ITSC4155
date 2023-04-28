import * as React from 'react';
import GoalService from "../../services/GoalService"
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import{useNavigate} from 'react-router-dom'




function UpdateDeleteGoalList(){
    const [goalList,setGoalList]=useState([]);
    const [open, setOpen] = React.useState(false);
    const navigate= useNavigate();








    
    useEffect(
        () =>{
            displayAllGoals()
        },[])


        const displayAllGoals = () =>{
            GoalService.getAllGoals().then((response) =>{
                setGoalList(response.data)
                console.log(response.data)
            })
        };
    


    const deleteGoal=(goalId) =>{
            GoalService.deleteGoal(goalId).then((response)=>{
                // displayAllGoals()
                setGoalList(response.data0)
                navigate("/")
                console.log("success")
            }).catch(error=>{
                console.log("Delete api failed to connect with server")
                console.log(error)
            })
        }

        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };


        return(
            <div>
                <Button variant='contained' onClick={handleClickOpen}>Edit Goal</Button>
                <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                        <TableRow>
                            <TableCell align='right'>Title</TableCell>
                            <TableCell align='right'>Operations</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {goalList.map(
                                goal =>
                                <TableRow key={goal.goalId}>
                                    <TableCell>{goal.title}</TableCell>
                                    <TableCell>
                                    <Button variant={"Contained"} component={Link} to= {`/createGoal/${goal.goalId}`}>Update</Button>
                                        <Button 
                                        variant={'Contained'} 
                                        color={"secondary"} 
                                        onClick={() => deleteGoal(goal.goalId)} 
                                        style={{marginLeft:"10px"}}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                </Dialog>
            </div>
        )
}

export default UpdateDeleteGoalList