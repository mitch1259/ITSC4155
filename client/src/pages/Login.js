import '../css/login.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import FancyButton from '../components/navigation/FancyButton';
import BudgitLogo from '../images/budgit-logo-colour.png';
import { TextField } from '@mui/material';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginStatus, setLoginStatus] = useState('');

    const loginUser = () => {
        Axios.post('http://localhost:3002/api/loginUser', {
          email: email,
          password: password
        }).then((response) => {
          console.log(response);
        });
        console.log("clicked! email: ", email, " password: ", password );
      };
    return (
        <div className='login-wrapper'>

                <div className="child-wrapper">
                    
                    <p className="main-header" id="main-header-login">Welcome to BudgIt</p>
                    <img className='login-budgit-logo' src={BudgitLogo} />
                    <p className='login-blurb'>Log in to start saving.</p>
                    <div className='login-form-fields'>
                        <div className='login-input-wrapper'>
                            <TextField className='login-input' 
                            label='Email Address' 
                            variant='filled' 
                            onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                              />
                        </div>
                        <div className='login-input-wrapper'>
                            <TextField className='login-input' 
                            label='Password' 
                            variant='filled' 
                            onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                            />
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
                                {/* <FancyButton buttonText="Login" /> */}
                                <button onClick={loginUser}> Login </button>
                            </Link>
                        </div>
                    </div>
                    
                </div>
        </div>
    );
}
export default Login;