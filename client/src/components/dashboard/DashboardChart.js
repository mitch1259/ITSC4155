import React from 'react'
import '../../css/dashboard/dashboardChart.css';
import '../../css/global.css';
import {Link } from 'react-router-dom';

import ChartComponent from '../examples/charts/radialCharts/ChartComponent.jsx';

const data = [
    { value: 40, title: '' },
    { value: 60, title: '' },
  ];


function DashboardChart({currentUserName}) {
  return (
    <div className='account-dashboard-chart-wrapper'>
        <div className='account-dashboard-chart-text-wrapper'>
            <p className='account-dashboard-chart-header'>
                Savings Goals
            </p>
            <p className='account-dashboard-chart-text'>
                Nice going, {currentUserName}! You've been making good progress towards your savings goals.
            </p>
            <p className='account-dashboard-chart-text'>
                Take a look and see for yourself.
            </p>
            <Link to={"/savings-boards/"}>
                <button className='board-link-button'>Go to Savings Goals</button>
            </Link>
        </div>
        <div className='account-dashboard-chart-card'>
            <ChartComponent data={data} />
        </div>
        
    </div>
  )
}

export default DashboardChart