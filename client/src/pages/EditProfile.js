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
import buffer from 'buffer';
import { Blob } from 'blob-polyfill';


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
    // const [selectedImage, setSelectedImage] = useState(null);
    const [profilePicture, setProfilePicture] = useState('');
    // const [file, setFile] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);


    const handleFileChange = (event) => {
      if (!event.target.files[0]) {
        return;
      } else {
        setSelectedFile(event.target.files[0]);
        setPreviewUrl(URL.createObjectURL(event.target.files[0]));
      }
    }


useEffect(() => {
  Axios.post('http://localhost:3002/api/get/currentUser', {userID: current}
    ).then((response) => {
      console.log(response.data);
      const fName = response.data[0].firstName
      const lName =response.data[0].lastName
      const mail= response.data[0].email;
      const pWord = response.data[0].password;
      const userPictureString = response.data[0].profilePicture;
      // console.log("USER PICTURE STRING: ", userPictureString);
      // console.log("USERPICTURESTRING: ", userPictureString);
      const base64Image = buffer.Buffer.from(userPictureString).toString('base64');
      // console.log("BASE64IMAGE: ", base64Image);
      // console.log("BASE64IMAGE: ", base64Image);

      setFirstName(fName);
      setLastName(lName)
      setEmail(mail)
      setPassword(pWord)
      setLoading(false);
      setProfilePicture(base64Image);
      // setCurrentUser(response.data);
    });
}, []);



  // Send the Blob object to your server-side code along with any other relevant data
  // const formData = new FormData();
  // formData.append("image", blob, "filename.png");
  // formData.append("metadata", JSON.stringify({ ... }));

  // Send the formData object to your server using fetch or any other method

  // In your server-side code, insert the Blob object into the mySQL database as a blob field


    console.log("BASE64IMAGE: ", profilePicture);
    const updateUser = () => {
      // const buff2 = buffer.Buffer.from()
      const buff = buffer.Buffer.from(previewUrl); // Node.js Buffer
      console.log("UPDATE USER BUFF: ", buff);
      const blob = new Blob([buff], {type: "image/jpg"}); // JavaScript Blob
      console.log("UPDATE USER BLOB: ", blob);
        // Decode the base64 string using TextDecoder()
      // const base64NewImageString = buffer.Buffer.from(previewUrl).toString('base64');
      // const base64String = base64NewImageString;
      // const byteCharacters = new TextDecoder('utf-8').decode(Uint8Array.from(atob(base64String), c => c.charCodeAt(0)));

      // // Convert the byte array to a Blob object
      // const byteArray = new Uint8Array([...byteCharacters].map(c => c.charCodeAt(0)));
      // const blob = new Blob([byteArray], {type: "image/png"});
      Axios.post('http://localhost:3002/api/changeUserInfo', {
        userID: current,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        profilePicture: blob
      }).then(() => {
        console.log('successful insert');
      });
      console.log("clicked! firstName: ", firstName, " lastName: ", lastName, " email: ", email, " password: ", password, " profilePicture: ", blob );
    };

    // console.log("PROFILE PICTURE: ", profilePicture);

    if(isLoading) {
      return <div className="account-dashboard-main">Loading...</div>
    }
    return (
        <div className='register-wrapper'>
        <div className='parent-wrapper'>
            <div className="child-wrapper">
            <h3 className='edit-profile-title'>Edit your Profile</h3>
            {/* <img src={StickMan} alt="User profile picture" className="edit-profile-image"/>
            <button className='new_pfp_button'> Click to upload new Picture</button> */}
            <div>
              {/* <img src={`data:image/png;base64,${profilePicture}` || previewUrl} alt="User profile picture"/> */}
              <img src={previewUrl || `data:image/png;base64,${profilePicture}`} alt="User profile picture" className='edit-profile-image'/>
              {/* <img src={previewUrl || profilePicture} alt="Profile picture" className="edit-profile-image"/> */}
              <input type="file" onChange={handleFileChange} />
            </div>
            



            {/* {selectedImage && (
              <div class="pic-display">
                
                <img
                  alt="not found"
                  width={"100px"}
                  src={URL.createObjectURL(selectedImage)}
                />
              </div>
            )} 
            <input
              type="file"
              name="myImage"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
              }}
            /> */}
            {/* <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <img src={file ? URL.createObjectURL(file) : StickMan} width={"50px"}/> */}
            {/* {selectedImage && (
        <div>
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )} */}

      <br />
      <br />
{/*       
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      /> */}
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
  