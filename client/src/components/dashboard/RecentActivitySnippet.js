import React, { useEffect } from 'react'
import '../../css/dashboard/recentActivitySnippet.css';
import RecentActivityTransaction from './RecentActivityTransaction';
import { useState } from 'react';
import Axios from 'axios';

function RecentActivitySnippet({ boardName, boardID }) {

  const [propTransactions, setPropTransactions] = useState('');
  const [propTransactionsLoading, setPropTransactionsLoading] = useState(true);

  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

  // get the board's two most recent transactions
  useEffect(() => {
    Axios.post('http://localhost:3002/api/boards/getRecentTwo', {boardID: boardID, currentDate: currentDate}
    ).then((response) => {
      setPropTransactions(Array.from(response.data));
      setPropTransactionsLoading(false);
    });
  }, []);

  // wait until APIs finish executing
  if(propTransactionsLoading) {
    return <div className="account-dashboard-main">Loading...</div>
  }

  // if a board has at least 1 transaction, display on the frontend
  if (propTransactions.length > 0) {
    return (
      <div className='recent-activity-snippet-wrapper'>
          <p className='recent-activity-snippet-header'>{boardName}</p>
          {propTransactions.map((transaction) => {
            let date = new Date(transaction.createDate);
            let transactionCreateDateBadFormat = date.toISOString().slice(0, 10);
            let parts = transactionCreateDateBadFormat.split('-');
            let formattedDate = `${parts[1]}/${parts[2]}/${parts[0]}`;
            return <RecentActivityTransaction recentChargeAmount={transaction.amount} recentChargeDate={formattedDate} recentChargeName={transaction.label} boardId={boardID}/>
          })}
      </div>
    )
  } else {
    // if a board has no transactions, display a status message to the user
    return (
      <div className='recent-activity-snippet-wrapper'>
          <p className='recent-activity-snippet-header'>{boardName}</p>
          <div className='recent-activity-snippet-details-wrapper'>
            <p className='recent-activity-snippet-details-no-transactions'>No recent transactions found</p>
          </div>
      </div>
    )
  }
 
}

export default RecentActivitySnippet
