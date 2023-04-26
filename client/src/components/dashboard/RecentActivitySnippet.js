import React from 'react'
import '../../css/dashboard/recentActivitySnippet.css';
import RecentActivityTransaction from './RecentActivityTransaction';
import { useState } from 'react';

function RecentActivitySnippet({ boardName, transactions, boardID }) {

  const [propTransactions, setPropTransactions] = useState(transactions);


  return (
    <div className='recent-activity-snippet-wrapper'>
        <p className='recent-activity-snippet-header'>{boardName}</p>
        {/* <RecentActivityTransaction recentChargeAmount="700" recentChargeDate="999999" recentChargeName="Verizon" /> */}
        {propTransactions.map((transaction) => {
          return <RecentActivityTransaction recentChargeAmount={transaction.amount} recentChargeDate={transaction.createDate} recentChargeName={transaction.label} boardId={boardID}/>
        })}
    </div>
  )
}

export default RecentActivitySnippet
