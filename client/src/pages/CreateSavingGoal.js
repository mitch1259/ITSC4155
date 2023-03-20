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

function CreateGoal(){
        const validationSchema= Yup.object().shape({
            goaltitle: Yup.string().required('A goal title is required'),
            savings:Yup.number().required('A positive number required').positive(),
            startingamount:Yup.number().required("enter a number you want to start your savings at.").positive(),
            description: Yup.string().required()
        });
    

    const{
        register,
        handleSubmit,
        formState:{errors} 
    }=useForm({
            resolver: yupResolver(validationSchema)
        });

    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    return(
        <div>
            <h1>
                Modal form:
            </h1>
            <br>
            </br>
            <Button variant='contained' onClick={handleClickOpen}>Crate a Goal</Button>
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
                    helperText={errors.goaltitle ? errors.goaltitle.message:" "}
                    required
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
                />
                <TextField autoFocus margin='dense' id="startingdate" label="Starting Date" type="date" fullWidth variant='standard' InputLabelProps={{shrink:true}}/>
                <TextField autoFocus margin='dense' id="enddate" label="Ending Date" type="date" fullWidth variant='standard' InputLabelProps={{shrink:true}}/>
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
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit()}>Create</Button>
            </DialogActions>

            </Dialog>
        </div>
    )
}

export default CreateGoal;