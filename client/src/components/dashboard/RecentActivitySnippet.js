import React, { useEffect } from 'react'
import '../../css/dashboard/recentActivitySnippet.css';
import RecentActivityTransaction from './RecentActivityTransaction';
import { useState } from 'react';
import Axios from 'axios';

function RecentActivitySnippet({ boardName, boardID }) {

  const [propTransactions, setPropTransactions] = useState('');
  const [propTransactionsLoading, setPropTransactionsLoading] = useState(true);

  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  console.log(currentDate);

  useEffect(() => {
    Axios.post('http://localhost:3002/api/boards/getRecentTwo', {boardID: boardID, currentDate: currentDate}
    ).then((response) => {
      console.log("recieved data: ", response.data);
      setPropTransactions(Array.from(response.data));
      setPropTransactionsLoading(false);
    });
  }, []);

  if(propTransactionsLoading) {
    return <div className="account-dashboard-main">Loading...</div>
  }

  return (
    <div className='recent-activity-snippet-wrapper'>
        <p className='recent-activity-snippet-header'>{boardName}</p>
        {/* <RecentActivityTransaction recentChargeAmount="700" recentChargeDate="999999" recentChargeName="Verizon" /> */}
        {propTransactions.map((transaction) => {
          let date = new Date(transaction.createDate);
          let transactionCreateDateBadFormat = date.toISOString().slice(0, 10);
          let parts = transactionCreateDateBadFormat.split('-');
          let formattedDate = `${parts[1]}/${parts[2]}/${parts[0]}`;
          return <RecentActivityTransaction recentChargeAmount={transaction.amount} recentChargeDate={formattedDate} recentChargeName={transaction.label} boardId={boardID}/>
        })}
    </div>
  )
}

export default RecentActivitySnippet
