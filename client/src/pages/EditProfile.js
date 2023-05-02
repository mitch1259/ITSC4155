import '../css/EditProfile.css';
import StickMan from '../images/stickman.jpg';
import SimpleDialog from "../components/profile.jsx";
import '../css/login.css';
import { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { Hidden, TextField } from '@mui/material';
import AuthContext from '../context/AuthProvider';
import DecryptFromLocalStorage from '../context/encryption/DecryptFromLocalStorage';
import buffer from 'buffer';

function EditProfile() {

  const [isLoading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
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
//Checks to make sure the Email meets requirments 
  function validateEmail(email) {
    var re = (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (email.length == 0) {
      setError(true);
      return false;
    }
    else if (re.test(email) == false) {
      setError(true);
      return false;
    }
    return true;
  }
  //Checks to make sure the Password meets requirments 
  function validatePassword(password) {
    if (password.length > 0) {
      var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/;
      return re.test(password);
    } else if (password !== confirmPassword) {
      return false;
    } else {
      return true;
    }
  }
//Checks to make sure the Names meets requirments 
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
      //Gets Users Data and sets them to variables 
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
  //Checks that the info the User added, meets requirments
  //If the data passes, adds it to the database
  const updateUser = () => {
    console.log('Button was pushed???')
    //Checks password
    if (!validatePassword(password)) {
      setError(true);
      return;
    }
    //If all the functions return true, adds new data to the database
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
        window.location = 'http://localhost:3000/profile';
      });
    }

    else {
      console.log('Failed to Update')
    };
  }

  if (isLoading) {
    return <div className="account-dashboard-main">Loading...</div>
  }
  //HTML Page 
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
                error={error && email.length == 0 || error && validateEmail(email) == false}
                helperText={error && email.length == 0 ? "Email cannot be empty" : "" || error && validateEmail(email) == false ? "This is not a valid email" : ""}

              />
            </div>
            <div>
              <TextField
                name="password"
                className='edit-profile-textfield'
                label='Password'
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
