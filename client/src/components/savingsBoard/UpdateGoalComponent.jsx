import * as React from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import * as Yup from 'yup';
import { useState, useEffect } from 'react'
import{Link,useParams,useNavigate} from 'react-router-dom'
import GoalService from '../../services/GoalService';


function UpdateGoal(){

    const [title, setTitle] = useState('')
    const [savings, setSavings] = useState('')
    const [startingAmount, setStartingAmount] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [description, setDescription] = useState('')
    const navigate= useNavigate();
    const {goalId}= useParams();
    const[goalList,setGoalList]=useState([]);
    
    const savingGoal = { title, savings, startingAmount, startDate, endDate, description }


    const updateGoal = (e) => {
        e.preventDefault();
        if (goalId) {
            GoalService.updateExercise(goalId, savingGoal).then((response) => {
                navigate("/exercise")
            }).catch(error => {
                console.log(error)
            })
        }
    
        }

        useEffect(() => {
            GoalService.getGoal(goalId).then((response) => {
                setTitle(response.data.title)
                setSavings(response.data.savings)
                setStartingAmount(response.data.startingAmount)
                startDate(response.data.startDate)
                setEndDate(response.data.endDate)
                setDescription(response.data.description)
            }).catch(error => {
                console.log(error)
            })
        },[goalId])


    return(
        <div>
            <container>
            {/* <Button variant='contained' onClick={handleClickOpen}>Crate a Goal</Button>
            <Dialog open={open} onClose={handleClose}> */}
                <DialogTitle>Update Goal</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="goaltitle"
                        label="Goal Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(textinput) => {
                            setTitle(textinput.target.value)
                        }}

                    />


                    <TextField
                        autoFocus
                        margin="dense"
                        id="savings"
                        label="Saving Amount"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={(textinput) => {
                            setSavings(textinput.target.value)
                        }}

                    />


                    <TextField
                        autoFocus
                        margin='dense'
                        id='startingamount'
                        label="Starting Amount"
                        type="number"
                        fullWidth
                        variant='standard'
                        onChange={(textinput) => {
                            setStartingAmount(textinput.target.value)
                        }}
                    />

                    <TextField
                        autoFocus margin='dense'
                        id="startingdate"
                        label="Starting Date"
                        type="date"
                        fullWidth variant='standard'
                        InputLabelProps={{ shrink: true }}
                        onChange={(textinput) => {
                            setStartDate(textinput.target.value)
                        }}

                    />

                    <TextField
                        autoFocus margin='dense'
                        id="enddate"
                        label="start date"
                        type="date"
                        fullWidth variant='standard'
                        InputLabelProps={{ shrink: true }}
                        onChange={(textinput) => {
                            setEndDate(textinput.target.value)
                        }}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(textinput) => {
                            setDescription(textinput.target.value)
                        }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button variant={"Contained"} component={Link} to="/savings-boards">Cancel</Button>
                    <Button variant='Contained' onClick={(e => updateGoal(e))}>Create</Button>
                </DialogActions>

            {/* </Dialog> */}
            </container>
        </div>
    )
}

export default UpdateGoal;