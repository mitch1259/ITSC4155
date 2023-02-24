import React from 'react'
import '../../css/dashboard/recentActivitySnippet.css';

function RecentActivitySnippet(props) {
  return (
    <div className='recent-activity-snippet-wrapper'>
        <p className='recent-activity-snippet-header'>{props.boardName} -- &#40;Remaining Budget: ${props.remainingBudget}&#41;</p>
        <div className='recent-activity-snippet-details-wrapper'>
            <p className='recent-activity-snippet-details-chargeNameDate'>{props.recentChargeDate1} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; {props.recentChargeName1}</p>
            <p className='recent-activity-snippet-details-chargeAmount'>${props.recentChargeAmount1}</p>
        </div>
        <div className='recent-activity-snippet-details-wrapper'>
            <p className='recent-activity-snippet-details-chargeNameDate'>{props.recentChargeDate2} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; {props.recentChargeName2}</p>
            <p className='recent-activity-snippet-details-chargeAmount'>${props.recentChargeAmount2}</p>
        </div>
        
    </div>
  )
}

export default RecentActivitySnippet
