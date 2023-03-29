import '../css/EditProfile.css';
// import { useState, useEffect } from 'react';
// import Axios from 'axios';
import StickMan from '../images/stickman.jpg';
import SimpleDialog from "../components/profile.jsx";
// import { TextField } from '@mui/material';
import '../css/login.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import { TextField } from '@mui/material';
import FancyButton from '../components/navigation/FancyButton';
import BudgitLogo from '../images/budgit-logo-colour.png';



function EditProfile() {

    const handleClick = () => {
        console.log("clicked");
    }

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // useEffect(() => {
    //   Axios.get('http://localhost:3002/api/get').then((response) => {
    //     var data = Array.from(response.data);
    //     setUsers(data);
    //   });
    // }, []);

    const updateUser = () => {
      Axios.post('http://localhost:3002/api/changeUserInfo', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      }).then(() => {
        console.log('successful insert');
      });
      console.log("clicked! firstName: ", firstName, " lastName: ", lastName, " email: ", email, " password: ", password );
    };

    return (
        // <div>
        // <div class="container-content">
        //     <form action="#">
        //       <p class='edit_profile_header'>Update Your Profile Informations</p>
        //         <div class="pic-display">
        //           {/* <img src="pics/Temp Gallery Pic 2.png" alt="temp pic"></img> */}
        //           <img src={StickMan} alt="React Image"/>
        //           <button class='new_pfp_button'> Click to upload new Picture</button>
        //         </div>
    
        //         <div>
        //             <input type="text" name="name" id="first_name" placeholder="Update First Name" required></input>
        //         </div>

        //         <div>
        //             <input type="text" name="name" id="last_name" placeholder="Update Last Name" required></input>
        //         </div>

        //         <div>
        //             <input type="email" name="email" id="email" placeholder="Enter new Email" required></input>
        //         </div>
        //         <div>
        //             <input type="text" name="name" id="password" placeholder="Update Password" required></input>
        //         </div>
        //         <div>
        //             <input type="text" name="name" id="password" placeholder="Retype New Password" required></input>
        //         </div>
        //         <div>
        //             <button class='submit'>Submit Changes</button>
        //         </div>
        //         <SimpleDialog></SimpleDialog>
                
        // </form>
        // </div>
        // </div>
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
  