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
<<<<<<< HEAD
=======

  const { auth, setAuth} = React.useContext(AuthContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
      Axios.get('http://localhost:3002/api/get/users').then((response) => {
        var data = Array.from(response.data);
        console.log(data);
      });
    }, []);

    const registerUser = () => {
      if(password != confirmPassword) {
        console.log("Password and Confirm Password do not match");
      }
      else {
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

>>>>>>> 4a9999915ae631fd88c09e66dfb814182c889509
    return (
      <div className='register-wrapper'>
        <div className='parent-wrapper'>
            <div className="child-wrapper">
            <h1 className="main-header">Welcome to BudgIt</h1>
            <img className='login-budgit-logo' src={BudgitLogo} />
            <h3 className='login-blurb'>Sign up and start saving!</h3>
          <div className='register-input-wrapper-half'>
            <TextField className='register-input-half-left' label='First Name' variant='filled' />
            <TextField className='register-input-half-right' label='Last Name' variant='filled' />
          </div>
          <div className='register-input-form-wrapper'>
            <div className='register-input-wrapper-full'>
              <TextField className='register-input-full' label='Email Address' variant='filled' />
            </div>
            <div className='register-input-wrapper-full'>
              <TextField className='register-input-full' label='Password' variant='filled' />
            </div>
            <div className='register-input-wrapper-full'>
              <TextField className='register-input-full' label='Confirm Password' variant='filled' />
            </div>
          </div>

          <div className='login-buttons-wrapper'>
            <Link to="/login">
              <p className='register-go-back'>Already have an account? Click here!</p>
            </Link>
            <Link to="/login">
              <FancyButton buttonText="Signup" />
            </Link>
          </div>
          
                
          
            </div>
        </div>
        </div>
    );
}
export default Register;