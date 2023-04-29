import '../css/Profile.css';
import Footer from './Footer.js'
import StickMan from '../images/stickman.jpg';
import { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import AuthContext from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import Transactions from "../components/profileTransactions.jsx";
import BoardLinksCard from '../components/dashboard/BoardLinksCard';
import DecryptFromLocalStorage from '../context/encryption/DecryptFromLocalStorage';
import buffer from 'buffer';





function Profile(props) {

    
    const { auth, setAuth, currentUser, setCurrentUser } = useContext(AuthContext);
    const [username, setUserName] = useState('');
    const [areBoardsLoading, setAreBoardsLoading] = useState(true);
    const [currentUserBoards, setCurrentUserBoards] = useState(true);
    
    console.log(currentUser);
    document.title = "User Profile";
    const clicked = console.log('this was clicked')
    const [isLoading, setLoading] = useState(true);
    var current = DecryptFromLocalStorage("userId");
    var name = "";
    var boards = [];
  
  const [pfp, setPFP] = useState('');
  // setCurrentUser(current);
  // console.log('currentUser state on dashboard: ', currentUser);
  // console.log('data type of cookie value after parseInt: ', typeof current);

useEffect(() => {
  Axios.post('http://localhost:3002/api/get/currentUser', {userID: current}
    ).then((response) => {
      name = response.data[0].firstName;
      const userPictureString = response.data[0].profilePicture;

      // console.log("name: ", name);
      console.log("This is the User Profile Pic: "+userPictureString)

      const base64Image = buffer.Buffer.from(userPictureString).toString('base64');
      // console.log("This is the User Profile Pic: "+userPictureString)

      // const base64Image = buffer.Buffer.from(userPictureString).toString('base64');
      setUserName(name);
      setLoading(false);
      
      setPFP(base64Image)
      
      setPFP(userPictureString)
      // setCurrentUser(response.data);
    });
}, []);


useEffect(() => {
  Axios.post('http://localhost:3002/api/get/currentUser/allBoards', {userID: current}
  ).then(response => {
    boards = Array.from(response.data);
    console.log("boards: ", boards);
    setCurrentUserBoards(boards);
    setAreBoardsLoading(false);
  })
}, []);

    const firstName = name;
    console.log(firstName);
  

    
//changed it so hopefully it works
    const logOutUser = () => {
      localStorage.removeItem('userId');
      setAuth(false);
    }

    if (areBoardsLoading) {
      return <div className="account-dashboard-main">Loading...</div>
    }

    return (
        <div className='profile-wrapper'>
          <p className='user-profile-banner'>User Profile</p>
            <div className="user-profile">
              <div className="inside-profile">
                <div className="pic-display">
                  {/* <img src="pics/Temp Gallery Pic 2.png" alt="temp pic"></img> */}
                  {/* {/* <img className="user-profile-image" src={StickMan} alt="User Image"/> */}
                  {/* <img src={pfp} alt="User profile picture" className='user-profile-image'/> */}
                  <img src={pfp} alt="User profile picture" className='user-profile-image'/>
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
                <BoardLinksCard name={username} currentUserBoards={currentUserBoards}/>
                </div>   
            </div>
        </div>

    );
  }
  
  export default Profile;