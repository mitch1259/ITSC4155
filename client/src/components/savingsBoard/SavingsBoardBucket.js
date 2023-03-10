import React from 'react'
import '../../css/savingsBoard/savingsBoardBucket.css';


const data =[
      {title: "Low Budget", budget: 25},
      {title: "Medium Low Budget", budget: 45},
      {title: "Medium Budget", budget: 70},
      {title: "High Budget", budget: 120},
]



const budgetToClassesMap= (budget) => {
    switch(true){
  case (budget < 30):
    return "low-budget"; 
  case (budget >= 30 && budget < 60):
    return "medium-low-budget"; 
  case (budget >= 60 && budget < 100):
    return "medium-budget"; 
  case (budget >= 100):
    return "high-budget";
  default: 
    return "budget-unknown";
  }
}



function SavingsBoardBucket(props) {
  
  return (
    <div className={budgetToClassesMap(budgetValue)}>
      {/* <div className='savings-board-bucket-wrapper'>
        <p className='savings-board-bucket-label'>{ props.remainingBudget }</p>
      </div> */}
    </div>
  )
}

export default SavingsBoardBucket
