import React from 'react';
import '../../css/dashboard/recentActivityCards.css';

import RecentActivitySnippet from './RecentActivitySnippet';

function RecentActivityCard() {

  return (
    <div className='recent-activity-cards-wrapper'>
      <div className='react-activity-snippets'>
      <p className='recent-activity-header'>Recent Activity</p>
        <RecentActivitySnippet
            boardName={"Example Board 1"}
            remainingBudget={"533.22"}
            recentChargeDate1={"01/08/23"}
            recentChargeDate2={"01/10/23"}
            recentChargeName1={"Chipotle Bowl"}
            recentChargeAmount1={"12.99"}
            recentChargeName2={"Downtown Charlotte Parking Fee"}
            recentChargeAmount2={"25.00"}
        />
        <RecentActivitySnippet
            boardName={"Example Board 2"}
            remainingBudget={"220.76"}
            recentChargeDate1={"01/14/23"}
            recentChargeDate2={"01/23/23"}
            recentChargeName1={"January Rent Payment"}
            recentChargeAmount1={"752.00"}
            recentChargeName2={"January Credit Card Payment"}
            recentChargeAmount2={"124.45"}
        />
      </div>
    </div>
  )

}

export default RecentActivityCard;
