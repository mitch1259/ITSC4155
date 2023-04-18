import React from 'react'
import '../../css/savingsBoard/savingsBoardBucket.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DeleteTransaction from './DeleteTransaction';


function SavingsBoardBucket({ remainingBudget, currentDay, transactions }) {

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
const percentage = clamp(remainingBudget / 500 * 100, 50, 250);
// const percentage = remainingBudget * 100 / 500;
console.log(percentage);
const bucketStyle = {
  height: percentage,
}

const [open, setOpen] = React.useState(false);
const handleOpen = () => {
  if (transactions.length > 0) {
    setOpen(true);
  } else {
    handleClose();
  }
  initialize();
}
const handleClose = () => {
  setOpen(false);
}

const [transacts, setTransacts] = React.useState('');

const initialize = () => {
  var toSend = [];

  for (let i = 0; i < transactions.length; i++) {
    //toSend = toSend + "Name: " + transactions[i].label + ", Date: " + transactions[i].createDate + ", Amount: " + transactions[i].amount + ", Category: " + transactions[i].category

    toSend.push(<tr><td>{transactions[i].label}‎ ‎ ‎ </td><td>$ {transactions[i].amount}‎ ‎ ‎ </td><td>{transactions[i].category}‎ ‎ ‎ </td><td><DeleteTransaction id={transactions[i].transactionID}/></td></tr>)
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
            <table>
              <thead>
                <tr>
                  <th>Name‎ ‎ ‎ </th>
                  <th>Amount‎ ‎ ‎ </th>
                  <th>Category‎ ‎ ‎ </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {transacts}
              </tbody>
            </table>
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleClose} sx={{fontFamily: "Barlow Condensed", textTransform: "none", fontSize: "18px", backgroundColor: "lightgreen"}}>Close</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SavingsBoardBucket
