import '../css/dashboard/accountDashboard.css';
import '../css/global.css';
import RecentActivityCard from '../components/dashboard/RecentActivityCards';
import BoardLinksCard from '../components/dashboard/BoardLinksCard';
import DashboardChart from '../components/dashboard/DashboardChart.js';

function AccountDashboard() {

  document.title = "Account Dashboard";

  return (
    <div className="account-dashboard-main">
      <div className='vertical-line-left'></div>
      <div className='vertical-line-right'></div>
      <p className='account-dashboard-welcome-header'>Welcome, {'Placeholder'}</p>
      <div className='dashboard-recent-activity-card-wrapper'>
        <RecentActivityCard />
      </div>
      <div className='dashboard-boards-links-wrapper'>
        <BoardLinksCard />
      </div>
      <div className='dashboard-chart-wrapper'>
        <DashboardChart />
      </div>
    </div>

  );
}

export default AccountDashboard;
