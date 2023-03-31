import React from 'react'
import SavingsBoardBucket from '../components/savingsBoard/SavingsBoardBucket';
import BoardHeader from '../components/savingsBoard/BoardHeader.js';
import BoardFunctionBar from '../components/savingsBoard/BoardFunctionBar';
import '../css/savingsBoard/savingsBoard.css';
import { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import AuthContext from '../context/AuthProvider';
import DecryptFromLocalStorage from '../context/encryption/DecryptFromLocalStorage';
import { CircularProgress } from '@mui/material';


function SavingsBoard() {
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
    // {
    //   "remainingBudget": 500,
    //   "currentDay": "3/11"
    // },
    // {
    //   "remainingBudget": 437,
    //   "currentDay": "3/12"
    // },
    // {
    //   "remainingBudget": 400,
    //   "currentDay": "3/13"
    // },
    // {
    //   "remainingBudget": 359,
    //   "currentDay": "3/14"
    // },
    // {
    //   "remainingBudget": 322,
    //   "currentDay": "3/15"
    // },
    // {
    //   "remainingBudget": 300,
    //   "currentDay": "3/16"
    // },
    // {
    //   "remainingBudget": 150,
    //   "currentDay": "3/17"
    // },
    // {
    //   "remainingBudget": 365,
    //   "currentDay": "3/11"
    // },
    // {
    //   "remainingBudget": 437,
    //   "currentDay": "3/12"
    // },
    // {
    //   "remainingBudget": 400,
    //   "currentDay": "3/13"
    // },
    // {
    //   "remainingBudget": 233,
    //   "currentDay": "3/14"
    // },
    // {
    //   "remainingBudget": 322,
    //   "currentDay": "3/15"
    // },
    // {
    //   "remainingBudget": 300,
    //   "currentDay": "3/16"
    // },
    // {
    //   "remainingBudget": 150,
    //   "currentDay": "3/17"
    // },
    // {
    //   "remainingBudget": 150,
    //   "currentDay": "3/11"
    // },
    // {
    //   "remainingBudget": 437,
    //   "currentDay": "3/12"
    // },
    // {
    //   "remainingBudget": 400,
    //   "currentDay": "3/13"
    // },
    // {
    //   "remainingBudget": 359,
    //   "currentDay": "3/14"
    // },
    // {
    //   "remainingBudget": 322,
    //   "currentDay": "3/15"
    // },
    // {
    //   "remainingBudget": 300,
    //   "currentDay": "3/16"
    // },
    // {
    //   "remainingBudget": 150,
    //   "currentDay": "3/17"
    // },
  ]

  const [isUserLoading, setIsUserLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  var current = DecryptFromLocalStorage("userId");
  var name = "";
  
  useEffect(() => {
    Axios.post('http://localhost:3002/api/get/currentUserInfo', {userID: current}
      ).then((response) => {
        const userData = Array.from(response.data);
        // userObject = userData[0];
        setUser(userData);
        setIsUserLoading(false);
      });
  }, []);

  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  console.log(currentDate);
  // const nextWeek = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  // console.log(nextWeek); 
  
  
  document.title = "Savings Board";

  if(isUserLoading) {
    return (
      <div className='loading'>
        <CircularProgress color="success"/>
      </div>
    )
  }
  return (
    <div className='savings-board-wrapper'>
      <div className='savings-board-header-wrapper'>
        <BoardHeader 
          boardTitle={user[0].boardName}
          boardDescription={user[0].boardDescription}
          remainingBudget={user[0].remainBudget}
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
