import '../css/EditProfile.css';
// import { useState, useEffect } from 'react';
// import Axios from 'axios';
import StickMan from '../images/stickman.jpg';
import SimpleDialog from "../components/profile.jsx";
// import { TextField } from '@mui/material';
import '../css/login.css';
import { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { Hidden, TextField } from '@mui/material';
import AuthContext from '../context/AuthProvider';
import DecryptFromLocalStorage from '../context/encryption/DecryptFromLocalStorage';
import buffer from 'buffer';

function EditProfile() {


  const handleClick = () => {
    console.log("clicked");
  }
  const [isLoading, setLoading] = useState(true);

  const [isLoading, setLoading] = useState(true);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  //const [databasePassword, setDatabasePassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  var current = DecryptFromLocalStorage("userId");
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
  }

  function validateEmail(email) {
    if (email.length == 0) {
      setError(true);
      return false;
    }
    else {
      var re = (
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      if(re.test(email)==false){
        setError(true);
      }
      return re.test(email);
    }
  }
  function validatePassword(password) {
    if (password.length > 0) {
      console.log("Password:"+password)
      var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      console.log("Password test: "+re.test(password))
      return re.test(password);

    } else if (password !== confirmPassword) {
      return false;
    } else {
      return true;
    }
  }


  function checkNames(fName, lName) {
    if (fName.length == 0 || lName.length == 0) {
      setError(true);
      return false;
    }
    else {
      return true;
    }
  }

  useEffect(() => {
    Axios.post('http://localhost:3002/api/get/currentUser', { userID: current }
    ).then((response) => {

      setFirstName(response.data[0].firstName);
      setLastName(response.data[0].lastName);
      setEmail(response.data[0].email);
      setImageUrl(response.data[0].profilePicture);
      setLoading(false);
    })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  const updateUser = () => {

    console.log('Button was pushed???')
    //All the validation/Error Handling for the Edit Profile Page
    //Series of if statements check for problems in data and, if any is found, it will be handled accordingly
    // if (password.length > 0) {
    //   if (password != confirmPassword || validatePassword(password) == false) {
    //     console.log('password did not pass:')
    //     console.log("Password: " + password)
    //     console.log("ConfirmPassword: " + confirmPassword)
    //     setError(true);
    //   }
    // }

    // if (email.length == 0 || validateEmail(email) == false) {
    //   console.log('email did not pass');
    //   setError(true);
    // }

    // else if (firstName.length == 0) {
    //   console.log('first name did not pass')
    //   setError(true);
    // }
    // else if (lastName.length == 0) {
    //   console.log('last name did not pass')
    //   setError(true);
    // }
    if (!validatePassword(password)) {
      setError(true);
      return;
    }
    if (validateEmail(email) && validatePassword(password) && checkNames(firstName, lastName)) {
      console.log('we passed');
      setError(false);
      Axios.post('http://localhost:3002/api/changeUserInfo', {
        userID: current,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        profilePicture: imageUrl
      }).then(() => {
        console.log('successful insert');
        //Un Comment this out

        window.location = 'http://localhost:3000/profile';
        // console.log("profilePicture is: "+base64String)
      });
      console.log("clicked! firstName: ", firstName, " lastName: ", lastName, " email: ", email, " password: ", password /*" profilePicture: ", base64String */);
    }


    else {
      console.log('Failed Dummy')
    };
  }


  if (isLoading) {
    return <div className="account-dashboard-main">Loading...</div>
  }
  return (
    <div className='register-wrapper'>
      <div className='parent-wrapper'>
        <div className="child-wrapper">
          <h3 className='edit-profile-title'>Edit your Profile</h3>
          <div className='edit-profile-image-div'>
            <p className='edit-profile-image-text'>Profile picture:</p>
            <img src={imageUrl || image} alt="User-entered Image" className='edit-profile-image' />
          </div>
          <TextField
            label="Image URL"
            variant='filled'
            value={imageUrl}
            onChange={handleImageUrlChange}
            onPaste={handlePaste}
            className='edit-profile-textfield'
          />

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
              error={error && firstName.length == 0}
              helperText={error && firstName.length == 0 ? "First Name cannot be empty" : ""}
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
              error={error && lastName.length == 0}
              helperText={error && lastName.length == 0 ? "Last Name cannot be empty" : ""}
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
                error={error && email.length == 0 || error && validateEmail(email) == false /*|| error&&searchUser(email) == false*/}
                helperText={error && email.length == 0 ? "Email cannot be empty" : "" || error && validateEmail(email) == false ? "This is not a valid email" : "" /*|| error&&searchUser(email) == false ? "A user with this email already exists":""*/}

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
                  setPassword(e.target.value);
                }
                }
                error={error && password != confirmPassword}
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
                  setConfirmPassword(e.target.value);
                }
                }
                error={error && password != confirmPassword}
                helperText={error && password != confirmPassword ? "Passwords do not match" : "" || error && validatePassword(password) == false ? "Password must be between 7-15 characters, and must include at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character" : ""}

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


export default EditProfile;