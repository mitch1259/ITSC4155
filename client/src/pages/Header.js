import React, { useContext } from "react";
import "../css/navigation.css";
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import DecryptFromLocalStorage from '../context/encryption/DecryptFromLocalStorage';


// images
import StickMan from '../images/stickman.jpg';
import BudgItLogo from '../images/budgit-logo.png';

const Header = (props) => {

    const { auth, setAuth, currentUser, setCurrentUser } = useContext(AuthContext);
    const [username, setUserName] = useState('');
    
    console.log(currentUser);
    document.title = "User Profile";
    const clicked = console.log('this was clicked')
    const [isLoading, setLoading] = useState(true);
    var current = DecryptFromLocalStorage("userId");
    var name = "";
  
  const [pfp, setPFP] = useState('');
  // setCurrentUser(current);
  // console.log('currentUser state on dashboard: ', currentUser);
  // console.log('data type of cookie value after parseInt: ', typeof current);

useEffect(() => {
  Axios.post('http://localhost:3002/api/get/currentUser', {userID: current}
    ).then((response) => {
      
      const userPictureString = response.data[0].profilePicture;

      

    //   const base64Image = buffer.Buffer.from(userPictureString).toString('base64');
      
      
      setPFP(userPictureString);
      setLoading(false);
    //   console.log("this is the header pfp: "+base64Image)
      // setCurrentUser(response.data);
    });
}, []);

    return (
        <div className="header">
            <table>
                <tr>
                    <td>
                        <h1 className="BudgIt">
                            <Link to="/" className="nav-logo" id="budgit-nav-logo">
                                <img src={BudgItLogo} className="nav-logo-picture" />
                                &nbsp;BudgIt
                            </Link>
                        </h1>
                    </td> 
                    {auth ?
                    <td>
                        <div className="Links"> 
                            <Link to="/" className="nav-link">Dashboard</Link> | 
                            <Link to="/savings-boards" className="nav-link">Savings Goals</Link> | 
                            <Link to="/profile" className="nav-link">
                                Profile
                                {/* If the user has a profile picture, display the profile picture, else display default Stickman image */}
                                {/* {/* <img className="nav-user-profile-picture" src={props.userProfilePicture ? props.userProfilePicture : StickMan} /> */}
                                <img src={pfp || StickMan} alt="User profile picture" className='nav-user-profile-picture'/>
                                {/* <img src={pfp} alt="User profile picture" className='nav-user-profile-picture'/> */}

                            </Link>
                        </div>
                    </td>
                    : <></>}
                </tr>
            </table>
        </div>
    )
    }

export default Header;