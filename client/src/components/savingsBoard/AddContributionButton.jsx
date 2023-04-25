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
import {useState,useEffect} from 'react'
// import{Link,useParams,useNavigate} from 'react-router-dom'
import GoalService from '../../services/GoalService';
import { Autocomplete } from '@mui/material';


//A button that allows user to add contributions to their goal.
function AddContribution(){

    const [open, setOpen] = React.useState(false);
    const [startingAmount,setStartingAmount]=useState('')
    const [savingGoalId,setGoalId]= useState('')

    const goalContribution ={startingAmount}

    const [goalList,setGoal]=useState([]);

    useEffect(
        () =>{
        getAllGoals()
    },[])

    const getAllGoals =() =>{
        GoalService.getAllGoals().then((response) =>{
            setGoal(response.data)
            console.log(response.data)
        });
    };



  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const onsubmit= () =>{
        
        GoalService.updateContribution(savingGoalId,goalContribution).then((response)=>{
            console.log(response.data)
        }
        ).catch(error =>{
            console.log(error)
        })
    }

    return(
        <div>
            <Button variant='contained' onClick={handleClickOpen}>Add Contribution</Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Contribution </DialogTitle>
                <DialogContent>

                    <Autocomplete
                    disablePortal
                    id="goalId"
                    options={goalList}
                    getOptionLabel={(option)=>option.title}
                    sx={{ width: 400}}
                    renderInput={(params) => <TextField {...params} label="Saving goals" />}
                    onChange={option=>{

                        setGoalId(option.target.value)
                    console.log(goalList.findIndex(g =>g.value=option))} 
                    }
                    />


                    {/* creates a blank space to fill the form with numnbers */}
                    <TextField 
                    autoFocus
                    margin='dense'
                    id='contribution'
                    label='contribution'
                    type='number'
                    fullWidth
                    variant='standard'
                    onChange={(newContribution) =>{
                        const oldContribution=GoalService.getGoal(savingGoalId).startingAmount;
                        const updatedContribution= newContribution.target.value+oldContribution;
                        setStartingAmount(updatedContribution)
                    }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() =>onsubmit()}>Add Contribution</Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default AddContribution;