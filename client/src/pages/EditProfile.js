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
import { Hidden, TextField } from '@mui/material';
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
    const [tempString, setString] = useState('');

    const { auth, setAuth} = useContext(AuthContext);

    var current = DecryptFromLocalStorage("userId");
    // const [selectedImage, setSelectedImage] = useState(null);
    // const [profilePicture, setProfilePicture] = useState({StickMan});
    // const [file, setFile] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);


    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
      setPreviewUrl(URL.createObjectURL(event.target.files[0]));
    }


useEffect(() => {
  Axios.post('http://localhost:3002/api/get/currentUser', {userID: current}
    ).then((response) => {
      console.log(response.data);
      const fName = response.data[0].firstName
      const lName =response.data[0].lastName
      const mail= response.data[0].email;
      const pWord = response.data[0].password;
      const pfp = response.data[0].profilePicture;
      setFirstName(fName);
      setLastName(lName)
      setEmail(mail)
      setPassword(pWord)
      setLoading(false);
      // setPreviewUrl(pfp)
      console.log('pfp is:')
      console.log(pfp)
      console.log('type of pfp:')
      console.log(typeof pfp)

      // const base64String = btoa(String.fromCharCode(...new Uint8Array(pfp)));
      const base64String = pfp.toString('base64')

      console.log('pfp 2.0 is:')
      console.log(base64String)
      console.log('type of pfp 2.0:')
      console.log(typeof base64String)
      setString(base64String)
      console.log("Temp string is:")
      console.log(tempString)
      console.log('Temp string type is:')
      console.log(typeof tempString)
      // setCurrentUser(response.data);
    });
}, []);

    const updateUser = () => {
      Axios.post('http://localhost:3002/api/changeUserInfo', {
        userID: current,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        profilePicture: selectedFile
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
            <h3 className='edit-profile-title'>Edit your Profile</h3>
            <div>
              <img src={previewUrl || StickMan} alt="Profile picture" className="edit-profile-image"/>
              <input type="file" onChange={handleFileChange} />
            </div>
            <img src={`data:image/png;base64,${tempString}`} alt=""/>
          <div>
            <TextField
              name="firstName"
              className='edit-profile-textfield'
              label='First Name'
              defaultValue={firstName}
              variant='filled'
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <TextField 
              name="lastName"
              className='edit-profile-textfield'
              label='Last Name'
              defaultValue={lastName}
              variant='filled'
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div>
            <div>
              <TextField
                name="email"
                className='edit-profile-textfield'
                label='Email Address'
                defaultValue={email}
                variant='filled'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <TextField
                name="password"
                className='edit-profile-textfield'
                label='Password'
                defaultValue={password}
                variant='filled'
                type='password'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div>
              <TextField
               className='edit-profile-textfield' 
               label='Confirm Password' 
               defaultValue={password}
              type='password'
               variant='filled' />
            </div>
          </div>

          <div className='login-buttons-wrapper'>
            {/* currently routing back to /registration for ease of testing, switch back to /login when complete */}
            <Link to="/profile">
              <button className="update-user-information" onClick={updateUser}>Update Infomation</button>
            </Link>
            
            <SimpleDialog></SimpleDialog>
          </div>
          
          </div>
        </div>
        </div>
    );
  }
  
  export default EditProfile;
  