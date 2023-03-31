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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import DecryptFromLocalStorage from '../../context/encryption/DecryptFromLocalStorage';
import Axios from 'axios';

function AddTransactionButton() {

    const [open, setOpen] = React.useState(false);
    const [transactionName, setTransactionName] = useState(null);
    const [transactionDate, setTransactionDate] = useState(null);
    const [transactionCategory, setTransactionCategory] = useState(null);
    const [transactionAmount, setTransactionAmount] = useState(null);
    const [transactionType, setTransactionType] = useState(null);
    const [isUserLoading, setIsUserLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    var current = DecryptFromLocalStorage('userId');

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

      // get current user information by userID
    useEffect(() => {
        Axios.post('http://localhost:3002/api/get/currentUserInfo', {userID: current}
        ).then((response) => {
            const userData = Array.from(response.data);
            // userObject = userData[0];
            setCurrentUser(userData);
            setIsUserLoading(false);
        });
    }, []);

    function logTransaction() {
        // console.log("current transaction: ");
        // console.log("transaction name: ", transactionName);
        // console.log("transaction category: ", transactionCategory);
        // console.log("transaction date: ", transactionDate);
        // console.log("transaction amount: ", transactionAmount);
        // console.log("transaction type: ", transactionType);
        var transactionAmountReturn = 0;
        var transactionDateReturn = new Date(transactionDate).toISOString().slice(0, 19).replace('T', ' ');
        if (transactionType == 'expense') {
            transactionAmountReturn = transactionAmount * -1;
        } else {
            transactionAmountReturn = transactionAmount;
        }
        console.log(currentUser[0].boardID);
        const transactionData = {
            boardID: currentUser[0].boardID,
            userID: current,
            category: transactionCategory,
            label: transactionName,
            createDate: transactionDateReturn,
            amount: transactionAmountReturn,
            isRecurrent: 0
        }
        console.log(transactionData);
        Axios.post('http://localhost:3002/api/newTransaction', transactionData)
        .then((response) => {
            console.log(response);
        });
        setTransactionAmount(null);
        setTransactionName(null);
        setTransactionDate(null);
        setTransactionType(null);
        setTransactionCategory(null);
        setOpen(false);
    }
    
  
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
                    required
                    variant="filled"
                    onChange={(e) => {
                        setTransactionName(e.target.value);
                    }}
                />
                <TextField
                    className='add-transaction-form'
                    margin="dense"
                    label="Transaction Category"
                    type="text"
                    fullWidth
                    required
                    variant="filled"
                    onChange={(e) => {
                        setTransactionCategory(e.target.value);
                    }}
                />
                <div className='small-space'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            className='add-transaction-form-date'
                            sx={sxFont}
                            label="Transaction Date"
                            required
                            value={transactionDate}
                            onChange={(newValue) => {
                                setTransactionDate(newValue);
                            }}
                        />
                    </LocalizationProvider>
                </div>
                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Amount"
                        fullWidth
                        required
                        type='number'
                        onChange={(e) => {
                            if (e.target.value < 0) {
                                e.target.value = 0;
                            }
                            setTransactionAmount(e.target.value);
                        }}
                    />
                <FormControl sx={{marginTop: "10px"}}>
                    <FormLabel id="demo-row-radio-buttons-group-label" sx={{fontFamily: "Barlow Condensed", fontSize: "20px", fontWeight: "500"}}>Type of Transaction:</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        required
                        onChange={(e) =>
                            setTransactionType(e.target.value)
                        }
                    >
                        <Tooltip title="Value to be SUBTRACTED from budget" arrow>
                            <FormControlLabel value="expense" control={<Radio />} label="Expense" />
                        </Tooltip>
                        <Tooltip title="Value to be ADDED to budget" arrow>
                            <FormControlLabel value="income" control={<Radio />} label="Income" />
                        </Tooltip>
                    </RadioGroup>
                </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{color: "red", fontFamily: "Barlow Condensed", backgroundColor: "antiquewhite", fontSize: "18px", textTransform: "none"}}>Cancel</Button>
                    <Button onClick={logTransaction} sx={{fontFamily: "Barlow Condensed", textTransform: "none", fontSize: "18px", backgroundColor: "lightgreen"}}>Add Transaction</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddTransactionButton