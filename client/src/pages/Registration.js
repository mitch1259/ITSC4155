import React from 'react';
import '../css/login.css';
import { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import FancyButton from '../components/navigation/FancyButton';
import BudgitLogo from '../images/budgit-logo-colour.png';
import AuthContext from '../context/AuthProvider';
function Register() {

  const { auth, setAuth} = React.useContext(AuthContext);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);

    useEffect(() => {
      Axios.get('http://localhost:3002/api/get/users').then((response) => {
        var data = Array.from(response.data);
        console.log(data);
      });
    }, []);
    
    function validateEmail(email) {
      var re = (
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      return re.test(email);
    }
    function validatePassword(password) {
      var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      return re.test(password);
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
          console.log("There is already a user: ", res.data);
          return false;
        //  foundUser = false;
        }
      })
      //return foundUser;
    }
    const registerUser = () => {
      setError(false);
      //Series of if statements check for problems in data nad, if any is found, it will be handled accordingly
      if(password.length == 0 || confirmPassword.length == 0 || password != confirmPassword || validatePassword(password) == false) {
        setError(true);
      }
      else if(email.length == 0 || validateEmail(email) == false || searchUser(email) == false) {
        setError(true);
      }
      else if(firstName.length == 0) {
        setError(true);
      }
      else if(lastName.length == 0) {
         setError(true);
      }
      else {
      setError(false);
      Axios.post('http://localhost:3002/api/registerUser', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      }).then(() => {
        console.log('successful insert');
        window.location = 'http://localhost:3000/login';
      });
      console.log("clicked! firstName: ", firstName, " lastName: ", lastName, " email: ", email, " password: ", password );
     }

    };
   
    

    if (auth) {
      return (
        <Navigate to="/"/>
      )
      
    }

    return (
      <div className='register-wrapper'>
        <div className='parent-wrapper'>
            <div className="child-wrapper">
            <h1 className="main-header">Welcome to BudgIt</h1>
            <img className='login-budgit-logo' src={BudgitLogo} />
            <h3 className='login-blurb'>Sign up and start saving!</h3>
          <div className='register-input-wrapper-half'>
            <TextField
              name="firstName"
              className='register-input-half-left'
              label='First Name'
              variant='filled'
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              error = {error&&firstName.length == 0}
              helperText = {error&&firstName.length == 0 ? "First Name cannot be empty" : ""}
            />
            <TextField 
              name="lastName"
              className='register-input-half-right'
              label='Last Name'
              variant='filled'
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              error = {error&&lastName.length == 0}
              helperText = {error&&lastName.length == 0 ? "Last Name cannot be empty" : ""}
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
                error = {error&&email.length == 0 || error&&validateEmail(email) == false || error&&searchUser(email) == false}
                helperText = {error&&email.length == 0 ? "Email cannot be empty" : "" || error&&validateEmail(email) == false ? "This is not a valid email" :"" || error&&searchUser(email) == false ? "A user with this email already exists":""}
              />
            </div>
            <div className='register-input-wrapper-full'>
              <TextField
                name="password"
                className='register-input-full'
                type="password"
                label='Password'
                variant='filled'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                error = {error&&password != confirmPassword || error&&password.length == 0 || error&&confirmPassword.length == 0}
             />
            </div>
            <div className='register-input-wrapper-full'>
              <TextField 
              name="confirmPassword"
              className='register-input-full' 
              label='Confirm Password' 
              variant='filled' 
              type="password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              error = {error&&password != confirmPassword || error&&password.length == 0 || error&&confirmPassword.length == 0}
              helperText = {error&&password != confirmPassword ? "Passwords do not match" :""|| error&&password.length == 0 || error&&confirmPassword.length == 0 ? "Passwords cannot be empty" : ""|| error&&validatePassword(password) == false ? "Password must be between 7-15 characters, and must include at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character":""}
              
              
              />
            </div>
          </div>

          <div className='login-buttons-wrapper'>
            <Link to="/login">
              <p className='register-go-back'>Already have an account? Click here!</p>
            </Link>
            {/* currently routing back to /registration for ease of testing, switch back to /login when complete */}
            <Link to="/registration">
              <button onClick={registerUser}>Signup</button>
            </Link>
          </div>
          
                
          
            </div>
        </div>
        </div>
    );
}
export default Register;