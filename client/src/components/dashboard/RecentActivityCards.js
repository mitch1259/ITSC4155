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
  const HashMap = require('hashmap');

  var current = DecryptFromLocalStorage("userId");

  const userMap = new HashMap();

  // get current user information by userID
  // useEffect(() => {
  //   Axios.post('http://localhost:3002/api/get/currentUserInfo', {userID: current}
  //     ).then((response) => {
  //       const userData = Array.from(response.data);
  //       // userObject = userData[0];
  //       setUser(userData);
  //       setIsUserLoading(false);
  //     });
  // }, []);

  // const groupedByBoards = user.reduce(function (r, a) {
  //   r[a.boardID] = r[a.boardID] || [];
  //   r[a.boardID].push(a);
  //   return r;
  // }, Object.create(null));

  // user.map(element => {
  //   console.log(element);
  //   if (userMap.has(element.boardID)) {
  //     userMap.set(element.boardID, user.indexOf(element));
  //   }
  // })


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

  // userMap = {}

  


  console.log("user boards: ", userBoards);
  console.log("transactions: ", recentTransactions);

  // userBoards.map((board) => {
  //   console.log(board.boardName);
  // })

  if(transactionsLoading||boardsLoading) {
    return (
      <div className='loading'>
        <CircularProgress color="success"/>
      </div>
    )
  }
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
    return (
      <div className='recent-activity-cards-wrapper'>
        <div className='react-activity-snippets'>
        <p className='recent-activity-header'>Recent Activity</p>
          <h2>No boards found.</h2>
        </div>
      </div>
    )
  }
  

}

export default RecentActivityCard;
