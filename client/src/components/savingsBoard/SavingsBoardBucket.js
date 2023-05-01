import React from 'react'
import '../../css/savingsBoard/savingsBoardBucket.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DeleteTransaction from './DeleteTransaction';
import { Tooltip } from '@mui/material';


function SavingsBoardBucket({ remainingBudget, currentDay, transactions, maxBudget }) {


  // function to map budget to different CSS classes
  const budgetToClassesMap = (budget, maxBudget) => {
    switch(true){
  // if budget is less than 25%
  case (budget <= (maxBudget * .25)):
    return "low-budget-red"; 
  // if budget is greater than 25% but less than/equal to 50%
  case (budget > (maxBudget * .25) && budget <= (maxBudget * .5)):
    return "medium-budget-orange"; 
  // if budget is greater than 50%
  case (budget > (maxBudget * .5)):
    return "savings-board-bucket-wrapper"; 
  default: 
    return "budget-unknown";
  }
}

// calculate percentage of total bucket to pass into bucket CSS
const percentage = remainingBudget / maxBudget * 100 > 0 ? remainingBudget / maxBudget * 100 + '%' : '1%';

// store percentage into object to pass in 
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

// map each transaction into a category to be displayed on frontend
const transactionsIntToCategoryMap = (transactionCategory) => {
  if (transactionCategory == 10) {
    return "Rent";
  } else if (transactionCategory == 20) {
    return "Groceries";
  } else if (transactionCategory == 30) { 
    return "Entertainment";
  } else if (transactionCategory == 40) {
    return "Other";
  } else {
    return " ";
  }
}

const initialize = () => {
  var toSend = [];

  for (let i = 0; i < transactions.length; i++) {
    toSend.push(<tr><td>{transactions[i].label}‎ ‎ ‎ </td><td>$ {transactions[i].amount}‎ ‎ ‎ </td><td>{transactionsIntToCategoryMap(transactions[i].category)}‎ ‎ ‎ </td><td><DeleteTransaction id={transactions[i].transactionID}/></td></tr>)
  }

  setTransacts(toSend);
}

const sxFont = {
  fontFamily: 'Barlow Condensed',
  fontSize: '20px',
  fontWeight: '500'
};

  return (
    <>
      <div className='savings-bucket-wrapper-wrapper' onClick={handleOpen}>
        <div className={budgetToClassesMap(remainingBudget, maxBudget)} style={bucketStyle}>
          <div className='savings-board-bucket'>
            <Tooltip title={'Remaining budget as of ' + currentDay} arrow>
              <p className='savings-board-bucket-remaining-budget'>${ Math.round(remainingBudget * 100) / 100 }</p>
            </Tooltip>
            <p className='savings-board-bucket-day'>{ currentDay }</p>
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={sxFont}>Transactions for {currentDay}:</DialogTitle>
        <DialogContent id='add-transaction-dialog-box' sx={{width: '500px'}}>
          <DialogContentText className='add-transaction-form' sx={sxFont}>
            <table>
              <thead>
                <tr>
                  <th style={{ marginRight: 100 + 'px'}}>Name‎ ‎ ‎ </th>
                  <th id='transaction-form-name'>Amount‎ ‎ ‎ </th>
                  <th id='transaction-form-name'>Category‎ ‎ ‎ </th>
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
