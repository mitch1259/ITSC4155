import React from 'react'
import '../../css/savingsBoard/savingsBoardBucket.css';


function SavingsBoardBucket({ remainingBudget, currentDay }) {

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

const percentage = remainingBudget / 500 * 100 + '%';
const bucketStyle = {
  height: percentage,
}


// document.documentElement.style.setProperty('--dynamic-height', percentage);
// console.log(remainingBudget / 500);
  
  return (
    <div className='savings-bucket-wrapper-wrapper'>
      <div className={budgetToClassesMap(remainingBudget)} style={bucketStyle}>
        <div className='savings-board-bucket'>
          <p className='savings-board-bucket-remaining-budget'>${ remainingBudget }</p>
          <p className='savings-board-bucket-day'>{ currentDay }</p>
        </div>
      </div>
    </div>
  )
}

export default SavingsBoardBucket
