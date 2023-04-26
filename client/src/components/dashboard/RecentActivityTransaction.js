import React from 'react'
import '../../css/dashboard/recentActivitySnippet.css';

function RecentActivityTransaction({ recentChargeAmount, recentChargeDate, recentChargeName, boardID }) {
  return (
    <div className='recent-activity-snippet-details-wrapper'>
        <p className='recent-activity-snippet-details-chargeDate'>{recentChargeDate}</p>
        <p className='recent-activity-snippet-details-chargeName'>{recentChargeName}</p>
        <p className='recent-activity-snippet-details-chargeAmount'>${recentChargeAmount}</p>
    </div>
  )
}

export default RecentActivityTransaction
