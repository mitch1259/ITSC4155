import '../css/Profile.css';
import Footer from './Footer.js'
import StickMan from '../images/stickman.jpg';
<<<<<<< HEAD
=======
import { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import AuthContext from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import Transactions from "../components/profileTransactions.jsx";


>>>>>>> 4a9999915ae631fd88c09e66dfb814182c889509


function Profile(props) {

    document.title = "User Profile";
    const clicked = console.log('this was clicked')
    
//changed it so hopefully it works
    const logOutUser = () => {
      localStorage.removeItem('userId');
      setAuth(false);
    }


    return (
        <div className='profile-wrapper'>
          <p className='user-profile-banner'>User Profile</p>
            <div className="user-profile">
              <div className="inside-profile">
                <div className="pic-display">
                  {/* <img src="pics/Temp Gallery Pic 2.png" alt="temp pic"></img> */}
                  <img className="user-profile-image" src={StickMan} alt="User Image"/>
                </div>
                <div className='user-display'>
                  <p className='user-profile-header'>Placeholder User</p>
                  <div className='user-profile-button-wrapper'>
                    <Link to="/profile/editprofile"> 
                      <button className='user-profile-button'>Edit Profile</button>
                    </Link>
                    <Link to="/login">
{/* changed it so i hope it works*/}
                      <button onClick={logOutUser} className='user-profile-button'>Log Out</button>
                    </Link>
                  </div>
                  
                </div>
                <div className='savings-display'>
                  <p> Total Savings: $10,532</p>
                </div>
                <div className='transation-button'>
                  {/* <button className='user-profile-button'>View Transaction History</button> */}
                  <Transactions></Transactions>
                </div>
              </div>
              
            </div>
            <div className="saves-board">
                <div className="inside">
                  <p className='user-profile-boards-header'>Your Savings Boards</p>
                  <div className="user-profile-board">
                    <p className='user-profile-board-header'>Board 1</p>
                    <p className='user-profile-board-savings'>Savings: $10,000</p>
                  </div>

                  <div className="user-profile-board">
                    <p className='user-profile-board-header'>Board 2</p>
                    <p className='user-profile-board-savings'>Savings: $532</p>
                  </div>   
                </div>   
            </div>
        </div>

    );
  }
  
  export default Profile;
  