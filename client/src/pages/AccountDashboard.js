import '../css/dashboard/accountDashboard.css';
import '../css/global.css';
import RecentActivityCard from '../components/dashboard/RecentActivityCards';
import BoardLinksCard from '../components/dashboard/BoardLinksCard';
import DashboardChart from '../components/dashboard/DashboardChart.js';
import GetCookie from '../context/cookies/getCookie';
import Cookies from 'js-cookie';
import { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import AuthContext from '../context/AuthProvider';
import DecryptFromLocalStorage from '../context/encryption/DecryptFromLocalStorage';
// import { useCookies } from 'react-cookie';

function AccountDashboard() {
  const [isLoading, setLoading] = useState(true);
  const [username, setUserName] = useState('');

  const { auth, setAuth} = useContext(AuthContext);

  var current = DecryptFromLocalStorage("userId");
  var name = "";
  // setCurrentUser(current);
  // console.log('currentUser state on dashboard: ', currentUser);
  // console.log('data type of cookie value after parseInt: ', typeof current);

useEffect(() => {
  Axios.post('http://localhost:3002/api/get/currentUser', {userID: current}
    ).then((response) => {
      name = response.data[0].firstName;
      console.log("name: ", name);
      setUserName(name);
      setLoading(false);
      // setCurrentUser(response.data);
    });
}, []);

    const firstName = name;
    console.log("Firstname", firstName);
  

  document.title = "Account Dashboard";

  if(isLoading) {
    return <div className="account-dashboard-main">Loading...</div>
  }

  return (
    <div className="account-dashboard-main">
      <div className='vertical-line-left'></div>
      <div className='vertical-line-right'></div>
      <p className='account-dashboard-welcome-header'>Welcome, {username} </p>
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