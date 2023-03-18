import React from 'react'
import SavingsBoardBucket from '../components/savingsBoard/SavingsBoardBucket';
import BoardHeader from '../components/savingsBoard/BoardHeader.js';
import BoardFunctionBar from '../components/savingsBoard/BoardFunctionBar';
import '../css/savingsBoard/savingsBoard.css';

const buckets = [
  {
    "remainingBudget": 500,
    "currentDay": "3/11"
  },
  {
    "remainingBudget": 437,
    "currentDay": "3/12"
  },
  {
    "remainingBudget": 400,
    "currentDay": "3/13"
  },
  {
    "remainingBudget": 359,
    "currentDay": "3/14"
  },
  {
    "remainingBudget": 322,
    "currentDay": "3/15"
  },
  {
    "remainingBudget": 300,
    "currentDay": "3/16"
  },
  {
    "remainingBudget": 150,
    "currentDay": "3/17"
  },
  
  
  
  
]

document.title = "Savings Board";


function SavingsBoard() {
  return (
    <div className='savings-board-wrapper'>
      <div className='savings-board-header-wrapper'>
        <BoardHeader 
          boardTitle="Example Board 1"
          boardDescription="This is a sample description for a savings board."
          remainingBudget="350"
        />
      </div>
      <div className='savings-board-function-bar'>
        <BoardFunctionBar 
          startDate="March 11"
          endDate="March 17"
        />
      </div>
      <div className='savings-board-buckets'>
        { buckets.map(bucket =>
          <SavingsBoardBucket remainingBudget={bucket.remainingBudget} currentDay={bucket.currentDay} />
        ) }
      </div>
      <div className='savings-board-buckets-timeline' />
    </div>
  )
}

export default SavingsBoard
