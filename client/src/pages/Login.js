import '../css/login.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import FancyButton from '../components/navigation/FancyButton';
import BudgitLogo from '../images/budgit-logo-colour.png';
import { TextField } from '@mui/material';

function Login() {
    return (
        <div className='login-wrapper'>

                <div className="child-wrapper">
                    
                    <p className="main-header">Welcome to BudgIt</p>
                    <img className='login-budgit-logo' src={BudgitLogo} />
                    <p className='login-blurb'>Log in to start saving.</p>
                    <div className='login-form-fields'>
                        <div className='login-input-wrapper'>
                            <TextField className='login-input' label='Email Address' variant='filled' />
                        </div>
                        <div className='login-input-wrapper'>
                            <TextField className='login-input' label='Password' variant='filled' />
                        </div>
                    </div>

                    <div className='login-buttons-wrapper'>
                        <div className="login-link-wrapper">
                            <Link to="/registration">
                                <FancyButton buttonText="Register" />
                            </Link>
                        </div>
                        <div className="login-link-wrapper">
                            <Link to="/">
                                <FancyButton buttonText="Login" />
                            </Link>
                        </div>
                    </div>
                    
                </div>
        </div>
    );
}
export default Login;