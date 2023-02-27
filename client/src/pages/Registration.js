import '../css/login.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import { TextField } from '@mui/material';
import FancyButton from '../components/navigation/FancyButton';
import BudgitLogo from '../images/budgit-logo-colour.png';

function Register() {
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