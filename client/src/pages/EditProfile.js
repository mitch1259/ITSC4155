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

function EditProfile() {

    const handleClick = () => {
        console.log("clicked");
    }
    const [isLoading, setLoading] = useState(true);
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [databasePassword, setDatabasePassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [tempString, setString] = useState('');

    const { auth, setAuth} = useContext(AuthContext);

    var current = DecryptFromLocalStorage("userId");
    // const [selectedImage, setSelectedImage] = useState(null);
    const [profilePicture, setProfilePicture] = useState('');
    // const [file, setFile] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [newProfilePicture, setNewProfilePicture] = useState('');

    const [imageUrl, setImageUrl] = useState("");
    const [image, setImage] = useState("");

    const [error, setError] = useState(false);

    const handleImageUrlChange = (event) => {
      setImageUrl(event.target.value);
    }
    
    const handlePaste = (event) => {
      event.preventDefault();
      const pastedText = event.clipboardData.getData("text");
      setImageUrl(pastedText);
    function validateEmail(email) {
      var re = (
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      return re.test(email);
    }
    function validatePassword(password) {
      if(password.length > 0 || password !== databasePassword) {
      var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      return re.test(password);
      }
      else {
        return true;
      }
    }
    function searchUser(email) {
     // const foundUser = new Boolean();
      Axios.post('http://localhost:3002/api/search/users', {
        email: email
      }).then((res, err) => {
        if(err){
          console.log(err);
          return true;
         // foundUser = true;
        } 
        else {
          if(res.data[0].email == email) {
            console.log("User found is current user");
            return true;
          }
          else {
          console.log("There is already a user: ", res.data);
          return false;
          }
        //  foundUser = false;
        }
      })
      //return foundUser;
    }
    
    // const handleFileChange = (event) => {
    //   if (!event.target.files[0]) {
    //     return;
    //   } else {
    //     setSelectedFile(event.target.files[0]);
    //     setPreviewUrl(URL.createObjectURL(event.target.files[0]));
    //     console.log("selected file is: "+event.target.files[0])
    //     console.log("Preview URL:   "+previewUrl)
    //     console.log("Type of Preview URL: "+ typeof previewUrl)
        
    //   }
    // }


useEffect(() => {
  Axios.post('http://localhost:3002/api/get/currentUser', {userID: current}
    ).then((response) => {
      console.log(response.data);
      const fName = response.data[0].firstName
      const lName =response.data[0].lastName
      const mail= response.data[0].email;
      const pWord = response.data[0].password;
      // const userPictureString = response.data[0].profilePicture;
      // console.log("USER PICTURE STRING: ", userPictureString);
      // console.log("USERPICTURESTRING: ", userPictureString);
      // const base64Image = buffer.Buffer.from(userPictureString).toString('base64');
      // console.log("BASE64IMAGE: ", userPictureString);
      // console.log("BASE64IMAGE: ", base64Image);
      console.log('step 1: ', fName);
      setFirstName(fName);
      console.log('step 2: ', firstName);
      console.log('step 1: ', lName);
      setLastName(lName);
      console.log('step 2', lastName);
      console.log('step 1: ', mail);
      setEmail(mail);
      console.log('step 2', email);
      console.log('step 1: ', pWord);
      setDatabasePassword(pWord);
      console.log('step 2:', databasePassword);
      setLoading(false);
      // setProfilePicture(base64Image);

      // setCurrentUser(response.data);
    });
}, []);



  // Send the Blob object to your server-side code along with any other relevant data
  // const formData = new FormData();
  // formData.append("image", blob, "filename.png");
  // formData.append("metadata", JSON.stringify({ ... }));

  // Send the formData object to your server using fetch or any other method

  // In your server-side code, insert the Blob object into the mySQL database as a blob field


    // console.log("BASE64IMAGE: ", profilePicture);
    const updateUser = () => {
      // const buff2 = buffer.Buffer.from()
      //const buff = buffer.Buffer.from(previewUrl); // Node.js Buffer
      //console.log("UPDATE USER BUFF: ", buff);
      //const blob = new Blob([buff], {type: "image/jpg"}); // JavaScript Blob
     // console.log("UPDATE USER BLOB: ", blob);
        // Decode the base64 string using TextDecoder()
    // const base64NewImageString = buffer.Buffer.from(previewUrl).toString('base64');
    // const base64String = base64NewImageString;
     // console.log("The base64 string is: "+base64String)
      // const byteCharacters = new TextDecoder('utf-8').decode(Uint8Array.from(atob(base64String), c => c.charCodeAt(0)));
      // console.log("SELECTED FILE: ", file);
      // console.log("NEW PROFILE PICTURE: ", newProfilePicture);
      // const reader = new FileReader();
      // reader.onload = () => {
      //   const B64string = reader.result.split(',')[1];
      //   setNewProfilePictureB64(B64string);
      // }
      // reader.readAsDataURL(newProfilePicture);
      // console.log('NEW PROFILE PICTURE STATE VARIABLE: ', newProfilePicture);
      // // Convert the byte array to a Blob object
      // const byteArray = new Uint8Array([...byteCharacters].map(c => c.charCodeAt(0)));
      // const blob = new Blob([byteArray], {type: "image/png"});

      //All the validation/Error Handling for the Edit Profile Page
      //Series of if statements check for problems in data nad, if any is found, it will be handled accordingly
      
      if(password != confirmPassword || validatePassword(password) == false) {  
        console.log('password did not pass, /nPAssword:', password, " /nConfirmPassword: ", confirmPassword);
        setError(true);
      }
      else if(email.length == 0 || validateEmail(email) == false /*|| searchUser(email) == false*/) {
        console.log('email did not pass');
        setError(true);
      }
      else if(firstName.length == 0) {
        console.log('first name did not pass')
        setError(true);
      }
      else if(lastName.length == 0) {
        console.log('last name did not pass')
         setError(true);
      }
      else {
        console.log('we passed');
        setError(false);
        Axios.post('http://localhost:3002/api/changeUserInfo', {
          userID: current,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          // profilePicture: blob
        }).then(() => {
          console.log('successful insert');
          window.location = 'http://localhost:3000/profile';
          // console.log("profilePicture is: "+base64String)
        });
        console.log("clicked! firstName: ", firstName, " lastName: ", lastName, " email: ", email, " password: ", password /*" profilePicture: ", base64String */);
      }
  };

    // console.log("PROFILE PICTURE: ", profilePicture);
    // console.log("PREVIEW URL: ", previewUrl);
    // console.log("SELECTED FILE ", selectedFile);

    if(isLoading) {
      return <div className="account-dashboard-main">Loading...</div>
    }
    return (
        <div className='register-wrapper'>
        <div className='parent-wrapper'>
            <div className="child-wrapper">
            <h3 className='edit-profile-title'>Edit your Profile</h3>
            <div>
              {/* <img src={`data:image/png;base64,${profilePicture}` || previewUrl} alt="User profile picture"/> */}
              {/* <img src={previewUrl || `data:image/png;base64,${profilePicture}`} alt="User profile picture" className='edit-profile-image'/> */}
              {/* <img src={previewUrl || profilePicture} alt="Profile picture" className="edit-profile-image"/> */}
              {/* <input type="file" onChange={handleFileChange} /> */}
            </div>
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
              error = {error&&firstName.length == 0}
              helperText = {error&&firstName.length == 0 ? "First Name cannot be empty" : ""}
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
              error = {error&&lastName.length == 0}
              helperText = {error&&lastName.length == 0 ? "Last Name cannot be empty" : ""}
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
                error = {error&&email.length == 0 || error&&validateEmail(email) == false /*|| error&&searchUser(email) == false*/}
                helperText = {error&&email.length == 0 ? "Email cannot be empty" : "" || error&&validateEmail(email) == false ? "This is not a valid email" :"" /*|| error&&searchUser(email) == false ? "A user with this email already exists":""*/}
              
              />
            </div>
            <div>
              <TextField
                name="password"
                className='edit-profile-textfield'
                label='Password'
                // defaultValue={password}
                variant='filled'
                type='password'
                onChange={(e) => {
                  if(e.target.value.length() == 0){
                    console.log('password: ', databasePassword);
                    setPassword(databasePassword);
                  }
                  else{
                    console.log("for some reason password is not empty");
                    setPassword(e.target.value);
                  }
                }}
                error = {error&&password != confirmPassword}
              />
            </div>
            <div>
              <TextField
               className='edit-profile-textfield' 
               label='Confirm New Password' 
              //  defaultValue={password}
              
                type='password'
                variant='filled' 
               onChange={(e) => {
                if(e.target.value.length() == 0){
                  console.log('confrm:', databasePassword);
                  setConfirmPassword(databasePassword);
                }
                else{
                  console.log('for some reason password is not empty');
                  setConfirmPassword(e.target.value);
                }
              }}
              error = {error&&password != confirmPassword}
              helperText = {error&&password != confirmPassword ? "Passwords do not match" :"" || error&&validatePassword(password) == false ? "Password must be between 7-15 characters, and must include at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character":""}
              
              />
            </div>
          </div>

          <div className='login-buttons-wrapper'>
            {/* currently routing back to /registration for ease of testing, switch back to /login when complete */}
            <Link to="/profile/editprofile">
              <button className="update-user-information" onClick={updateUser}>Update Infomation</button>
            </Link>
            
            <SimpleDialog></SimpleDialog>
          </div>
          
          </div>
        </div>
        </div>
    );
  }
}
  export default EditProfile;
  