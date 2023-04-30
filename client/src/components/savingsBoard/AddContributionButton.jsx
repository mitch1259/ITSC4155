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
import { useState } from 'react'
// import{Link,useParams,useNavigate} from 'react-router-dom'
import GoalService from '../../services/GoalService';

//A button that allows user to add contributions to their goal.
function AddContribution(goal) {
    
    const [open, setOpen] = React.useState(false);
    const [startingAmount, setStartingAmount] = useState('')

    const goalArray =(e) =>{
        const newStartingAmount=Number(startingAmount)
        const newArray=e.map(element =>{
            return{
                goalId:element.goalId,
                title:element.title,
                startingAmount:newStartingAmount+element.startingAmount

            }
        })
        return newArray

    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onsubmit = (e) => {

        GoalService.updateContribution(e).then((response) => {
            console.log(response.data)
            window.location.reload(true)
        }
        ).catch(error => {
            console.log(error)
        })
    }

    return (
        <div>

            <Button variant='contained' onClick={handleClickOpen}>Add Contribution</Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Contribution </DialogTitle>
                <DialogContent>


                    {/* creates a blank space to fill the form with numnbers */}
                    <TextField
                        autoFocus
                        margin='dense'
                        id='contribution'
                        label='contribution'
                        type='number'
                        fullWidth
                        variant='standard'
                        onChange={(newContribution) => {
                            setStartingAmount(newContribution.target.value)
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => onsubmit(goalArray(goal.goal))}>Add Contribution</Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default AddContribution;