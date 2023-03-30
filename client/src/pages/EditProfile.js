import '../css/EditProfile.css';
// import { useState, useEffect } from 'react';
// import Axios from 'axios';
import StickMan from '../images/stickman.jpg';
import SimpleDialog from "../components/profile.jsx";
// import { TextField } from '@mui/material';
import '../css/login.css';
import { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import { TextField } from '@mui/material';
import AuthContext from '../context/AuthProvider';
import DecryptFromLocalStorage from '../context/encryption/DecryptFromLocalStorage';



function EditProfile() {

    const handleClick = () => {
        console.log("clicked");
    }
    const [isLoading, setLoading] = useState(true);
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { auth, setAuth} = useContext(AuthContext);

    var current = DecryptFromLocalStorage("userId");

useEffect(() => {
  Axios.post('http://localhost:3002/api/get/currentUser', {userID: current}
    ).then((response) => {
      console.log(response.data);
      // name = response.data[0].firstName + response.data[0].lastName + response.data[0].email;
      // setUserName(name);
      setLoading(false);
      // setCurrentUser(response.data);
    });
}, []);

    const updateUser = () => {
      Axios.post('http://localhost:3002/api/changeUserInfo', {
        userID: current,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      }).then(() => {
        console.log('successful insert');
      });
      console.log("clicked! firstName: ", firstName, " lastName: ", lastName, " email: ", email, " password: ", password );
    };
    if(isLoading) {
      return <div className="account-dashboard-main">Loading...</div>
    }
    return (
        <div className='register-wrapper'>
        <div className='parent-wrapper'>
            <div className="child-wrapper">
            <h3 className='login-blurb'>Edit your Profile</h3>
            <div class="pic-display">
              {/* <img src="pics/Temp Gallery Pic 2.png" alt="temp pic"></img> */}
              <img src={StickMan} alt="React Image"/>
              <button class='new_pfp_button'> Click to upload new Picture</button>
              </div>
          <div className='register-input-wrapper-half'>
            <TextField
              name="firstName"
              className='register-input-half-left'
              label='First Name'
              variant='filled'
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <TextField 
              name="lastName"
              className='register-input-half-right'
              label='Last Name'
              variant='filled'
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className='register-input-form-wrapper'>
            <div className='register-input-wrapper-full'>
              <TextField
                name="email"
                className='register-input-full'
                label='Email Address'
                variant='filled'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className='register-input-wrapper-full'>
              <TextField
                name="password"
                className='register-input-full'
                label='Password'
                variant='filled'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className='register-input-wrapper-full'>
              <TextField className='register-input-full' label='Confirm Password' variant='filled' />
            </div>
          </div>

          <div className='login-buttons-wrapper'>
            {/* currently routing back to /registration for ease of testing, switch back to /login when complete */}
            <Link to="/profile">
              <button onClick={updateUser}>Update Infomation</button>
            </Link>
            
            <SimpleDialog></SimpleDialog>
          </div>
          
          </div>
        </div>
        </div>
    );
  }
  
  export default EditProfile;
  