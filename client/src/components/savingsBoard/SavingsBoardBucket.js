import React from 'react'
import '../../css/savingsBoard/savingsBoardBucket.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


function SavingsBoardBucket({ remainingBudget, amount, currentDay, transactions }) {

  const budgetToClassesMap= (budget) => {
    switch(true){
  case (budget <= 300):
    return "low-budget-red"; 
  case (budget > 300 && budget <= 400):
    return "medium-budget-orange"; 
  case (budget > 400):
    return "savings-board-bucket-wrapper"; 
  default: 
    return "budget-unknown";
  }
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

// console.log(window.getComputedStyle(document.documentElement).getPropertyValue('--dynamic-height'));
const percentage = clamp(remainingBudget / 500 * 100, 50, 300);
// console.log(percentage);
const bucketStyle = {
  height: percentage,
}

const [open, setOpen] = React.useState(false);
const handleOpen = () => {
  setOpen(true);
  initialize();
}
const handleClose = () => {
  setOpen(false);
}

const [transacts, setTransacts] = React.useState('');

const initialize = () => {
  var toSend = "";

  for (let i = 0; i < transactions.length; i++) {
    toSend = toSend + "Name: " + transactions[i].label + ", Date: " + transactions[i].createDate + ", Amount: " + transactions[i].amount + ", Category: " + transactions[i].category + ", Recurrence: " + transactions[i].isRecurrent + "\n\n\n"
  }

  setTransacts(toSend);
}

const sxFont = {
  fontFamily: 'Barlow Condensed',
  fontSize: '20px',
  fontWeight: '500'
};

// document.documentElement.style.setProperty('--dynamic-height', percentage);
// console.log(remainingBudget / 500);
  
  return (
    <>
      <div className='savings-bucket-wrapper-wrapper' onClick={handleOpen}>
        <div className={budgetToClassesMap(remainingBudget)} style={bucketStyle}>
          <div className='savings-board-bucket'>
            <p className='savings-board-bucket-remaining-budget'>${ remainingBudget }</p>
            <p className='savings-board-bucket-day'>{ currentDay }</p>
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={sxFont}>Transactions for {currentDay}:</DialogTitle>
        <DialogContent id='add-transaction-dialog-box'>
          <DialogContentText className='add-transaction-form' sx={sxFont}>
            {transacts}
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleClose} sx={{color: "red", fontFamily: "Barlow Condensed", backgroundColor: "antiquewhite", fontSize: "18px", textTransform: "none"}}>Close</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SavingsBoardBucket