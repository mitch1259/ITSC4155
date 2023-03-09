import React from 'react'
import '../../css/savingsBoard/savingsBoardBucket.css';

// const totalBudget = 100;
// const bucketStyle = ""
// const remBudget = props.remainingBudget;

// if (remBudget >= 75) {
//     bucketStyle = "savings-board-bucket-wrapper-green";
// } else if (remBudget < 75 && remBudget >= 50) {
//     bucketStyle = "savings-board-bucket-wrapper-red";
// }

function SavingsBoardBucket(props) {
  return (
    <div className='savings-board-bucket-wrapper'>
      {/* <div className='savings-board-bucket-wrapper'>
        <p className='savings-board-bucket-label'>{ props.remainingBudget }</p>
      </div> */}
    </div>
  )
}

export default SavingsBoardBucket
