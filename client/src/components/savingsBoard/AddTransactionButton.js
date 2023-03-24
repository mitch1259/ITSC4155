import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Tooltip } from '@mui/material';
import PlusIcon from '../../images/plus-icon-2-white.png';
import '../../css/savingsBoard/addTransactionButton.css';
import Checkbox from '@mui/material/Checkbox';
import Recurrent from './Recurrent';
import Axios from 'axios';

function AddTransactionButton() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const sxFont = {
        fontFamily: 'Barlow Condensed',
        fontSize: '20px',
        fontWeight: '500'
    };

    const [recurrent, setRecurrent] = React.useState(false);

    const handleChange = (event) => {
        setRecurrent(event.target.checked)
    }

    let recurrenceForm
    if (recurrent) {
        recurrenceForm = <Recurrent/>
    } else {
        recurrenceForm = ""
    }

    const [name, setName] = React.useState("");
    const handleName = (event) => {
        setName(event.target.value);
        console.log(event.target.value);
    }

    const [date, setDate] = React.useState("");
    const handleDate = (event) => {
        setDate(event.target.value);
        console.log(event.target.value);
    }

    const [category, setCat] = React.useState("");
    const handleCat = (event) => {
        setCat(event.target.value);
        console.log(event.target.value);
    }

    const [amount, setAmount] = React.useState("");
    const handleAmount = (event) => {
        setAmount(event.target.value);
        console.log(event.target.value);
    }

    const submit = () => {

        Axios.post('http://localhost:3002/api/transaction/submit', {
            boardID: 1,
            userID: 1,
            category: category,
            amount: amount,
            createDate: date,
            label: name,
            isRecurrent: recurrent
        }).then(() => {
          console.log("successful insert");
        });

        console.log(recurrenceForm.recurrence);
        //DOES NOT WORK - NEED TO FIGURE OUT HOW TO PULL

        if (recurrent) {
            Axios.post('http://localhost:3002/api/transaction/submit/recurrent', {
                transactionID: 1,
                recurrence: 1
            })
        }

        handleClose();
      };
  
    return (
        <div id='transaction-button-wrapper'>
            <Button variant="outlined" onClick={handleClickOpen} id='add-transaction-button'>
                <img src={ PlusIcon } id='add-transaction-button-plusIcon' />
                Add Transaction
            </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={sxFont}>New Transaction</DialogTitle>
            <DialogContent id='add-transaction-dialog-box'>
                <DialogContentText className='add-transaction-form' sx={sxFont}>
                    To log a transaction, please fill out the form below.
                </DialogContentText>
                <TextField
                    className='add-transaction-form'
                    autoFocus
                    margin="dense"
                    label="Transaction Name"
                    type="text"
                    fullWidth
                    variant="filled"
                    onChange={handleName}
                />
                <TextField
                    className='add-transaction-form'
                    margin="dense"
                    label="Transaction Date"
                    type="date"
                    fullWidth
                    variant="filled"
                    sx={sxFont}
                    onChange={handleDate}
                />
                <TextField
                    className='add-transaction-form'
                    margin="dense"
                    label="Transaction Category"
                    type="text"
                    fullWidth
                    variant="filled"
                    onChange={handleCat}
                />
                <TextField
                    className='add-transaction-form'
                    margin="dense"
                    label="Transaction Amount"
                    type="text"
                    fullWidth
                    variant="filled"
                    onChange={handleAmount}
                />
                <FormControl sx={{marginTop: "10px"}}>
                    <FormLabel id="demo-row-radio-buttons-group-label" sx={{fontFamily: "Barlow Condensed", fontSize: "20px", fontWeight: "500"}}>Type of Transaction:</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <Tooltip title="Value to be SUBTRACTED from budget" arrow>
                            <FormControlLabel value="expense" control={<Radio />} label="Expense" />
                        </Tooltip>
                        <Tooltip title="Value to be ADDED to budget" arrow>
                            <FormControlLabel value="income" control={<Radio />} label="Income" />
                        </Tooltip>
                    </RadioGroup>
                    <FormLabel id="demo-row-radio-buttons-group-label" sx={{fontFamily: "Barlow Condensed", fontSize: "20px", fontWeight: "500"}}>Recurrence:</FormLabel>
                        <Tooltip title="Will this transaction repeat?" arrow>
                            <FormControlLabel control={<Checkbox checked={recurrent} onChange={handleChange}/>} label="Is this a recurrent transaction?"/>
                        </Tooltip>
                        {recurrenceForm}
                </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{color: "red", fontFamily: "Barlow Condensed", backgroundColor: "antiquewhite", fontSize: "18px", textTransform: "none"}}>Cancel</Button>
                    <Button onClick={submit} sx={{fontFamily: "Barlow Condensed", textTransform: "none", fontSize: "18px", backgroundColor: "lightgreen"}}>Add Transaction</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddTransactionButton