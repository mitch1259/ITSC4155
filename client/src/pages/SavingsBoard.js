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
  const [areTransactionsLoading, setAreTransactionsLoading] = useState(true);
  const [user, setUser] = useState();
  const [currentWindowTransactions, setCurrentWindowTransactions] = useState();
  
  var current = DecryptFromLocalStorage("userId");
  console.log(current);
  var name = "";
  
  useEffect(() => {
    Axios.post('http://localhost:3002/api/get/currentUserInfo', {userID: current}
      ).then((response) => {
        console.log('this ran');
        const userData = Array.from(response.data);
        console.log(userData);
        setUser(userData);
        setIsUserLoading(false);
      });
  }, []);
  console.log("current user: ", user, " current page: SAVINGS BOARD");

  // const now = new Date();
  // const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  // const formattedNow = now.toISOString().slice(0, 19).replace('T', ' ');
  // const formattedOneWeekAgo = oneWeekAgo.toISOString().slice(0, 19).replace('T', ' ');
  // const userBoard = user[0].boardID;
  // const previousWeekInfo = {
  //   startDate: formattedNow,
  //   endDate: formattedOneWeekAgo,
  //   boardID: userBoard
  // }

  // useEffect(() => {
  //   Axios.post('http://localhost:3002/api/get/previousWeek', previousWeekInfo)
  //   .then((response) => {
  //     console.log('this ran in window data');
  //     const windowData = Array.from(response.data);
  //     setCurrentWindowTransactions(windowData);
  //     setAreTransactionsLoading(false);
  //   });
  // }, []);
  
  
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
