import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as Yup from 'yup';
import { useState, useEffect } from 'react'
// import{Link,useParams,useNavigate} from 'react-router-dom'
import GoalService from '../services/GoalService';

function CreateGoal() {

    //creates the const to allow input valiacation using react hook and yum
    const validationSchema = Yup.object().shape({
        goaltitle: Yup.string().required('A goal title is required'),
        savings: Yup.number().required('A positive number required').positive(),
        startingamount: Yup.number().required("enter a number you want to start your savings at.").positive(),
        startingdate: Yup.date().required("Enter a date"),
        enddate: Yup.date().required("enter a end date"),
        description: Yup.string().required()
    });



    const [title, setTitle] = useState('')
    const [savings, setSavings] = useState('')
    const [startingAmount, setStartingAmount] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [description, setDescription] = useState('')
    // const navigate= useNavigate();
    // const createGoal={title}
    const savingGoal = { title, savings, startingAmount, startDate, endDate, description }


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (e) => {
        //event problem with preventDefault but the rest works.
        // e.preventDefault() 
        GoalService.createGoal(savingGoal).then((response) => {
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })
        setOpen(false);
    }




    return (
        <div>
            <Button variant='contained' onClick={handleClickOpen}>Create a Goal</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create A Goal</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="goaltitle"
                        label="Goal Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        {...register("goaltitle")}
                        error={Boolean(errors.goaltitle)}
                        helperText={errors.goaltitle ? errors.goaltitle.message : " "}
                        required
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
                        {...register("savings")}
                        error={Boolean(errors.savings)}
                        // helperText={errors.savings ? errors.savings.message:" "}
                        required
                        onChange={(textinput) => {
                            setSavings(textinput.target.value)
                        }}

                    />
                    <p>{errors.savings?.message}</p>



                    <TextField
                        autoFocus
                        margin='dense'
                        id='startingamount'
                        label="Starting Amount"
                        type="number"
                        fullWidth
                        variant='standard'
                        {...register('startingamount')}
                        error={Boolean(errors.startingamount)}
                        //helperText={errors.startingamount ? errors.startingamount.message:" "}
                        required

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
                        error={Boolean(errors.startingdate)}
                        required
                        {...register("startingdate")}
                        InputLabelProps={{ shrink: true }}
                        onChange={(textinput) => {
                            setStartDate(textinput.target.value)
                        }}

                    />

                    <TextField
                        autoFocus margin='dense'
                        id="enddate"
                        label="End Date"
                        type="date"
                        {...register("enddate")}
                        fullWidth variant='standard'
                        InputLabelProps={{ shrink: true }}
                        error={Boolean(errors.enddate)}
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
                        {...register('description')}
                        errors={Boolean(errors.description)}

                        onChange={(textinput) => {
                            setDescription(textinput.target.value)
                        }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit(e => onSubmit(e))}>Create</Button>
                </DialogActions>

            </Dialog>
        </div>
    )
}

export default CreateGoal;