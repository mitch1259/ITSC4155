import React from 'react';
import DecryptFromLocalStorage from '../../context/encryption/DecryptFromLocalStorage';
import '../../css/dashboard/recentActivityCards.css';
import { CircularProgress } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import RecentActivitySnippet from './RecentActivitySnippet';
import AuthContext from '../../context/AuthProvider';

function RecentActivityCard() {

  const { auth, setAuth } = useContext(AuthContext);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const [boardsLoading, setBoardsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userBoards, setUserBoards] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState(null);

  var current = DecryptFromLocalStorage("userId");

  // get current all of the user's boards by userID
  useEffect(() => {
    Axios.post('http://localhost:3002/api/get/currentUser/allBoards', {userID: current}
      ).then((response) => {
        var boardsData = Array.from(response.data);
        // userObject = userData[0];
        setUserBoards(boardsData);
        setBoardsLoading(false);
      });
  }, []);

  // get the two most recent transactions per board
  useEffect(() => {
    Axios.post('http://localhost:3002/api/get/currentUser/recentTransactions', {userID: current}
      ).then((response) => {
        var transactionsData = Array.from(response.data);
        // userObject = userData[0];
        setRecentTransactions(transactionsData);
        setTransactionsLoading(false);
      });
  }, []);

 
  // wait until all APIs finish executing
  if(transactionsLoading||boardsLoading) {
    return (
      <div className='loading'>
        <CircularProgress color="success"/>
      </div>
    )
  }
  // if a user has any boards, render those to the frontend
  if (userBoards.length > 0) {
    return (
      <div className='recent-activity-cards-wrapper'>
        <div className='react-activity-snippets'>
        <p className='recent-activity-header'>Recent Activity</p>
        <div className='recent-activity-snippets-scroll'>
            { userBoards.map( (board) => {
              return <RecentActivitySnippet boardName={board.boardName} transactions={recentTransactions} boardID={board.boardID}/>
            })
          }
        </div>
        </div>
      </div>
    )
  } else {
     // if user has no boards, display an empty card with a status message
    return (
      <div className='recent-activity-cards-wrapper'>
        <div className='react-activity-snippets'>
        <p className='recent-activity-header'>Recent Activity</p>
          <p className='recent-activity-no-boards'>No boards found. Create a new board to start saving!</p>
        </div>
      </div>
    )
  }
  

}

export default RecentActivityCard;
