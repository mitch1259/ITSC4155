import '../css/login.css';
import { useState, useEffect, useRef, useContext } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import FancyButton from '../components/navigation/FancyButton';
import BudgitLogo from '../images/budgit-logo-colour.png';
import { TextField } from '@mui/material';
import SetCookie from '../context/cookies/setCookie';
import AuthContext from '../context/AuthProvider';
import EncryptToLocalStorage from '../context/encryption/EncryptToLocalStorage';
import { Navigate, Outlet } from 'react-router-dom';

function Login() {
    
    const {auth, setAuth } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const loginUser = (e) => {
        e.preventDefault();
        const userData = {
            email: email,
            password: password
        }
        Axios.post('http://localhost:3002/api/loginUser', userData)
        .then((response) => {
            setError(false);
            console.log('received response: ', response.data);
            setAuth(true);
            console.log('response NO DATA: ', response);
            console.log('response WITH DATA: ' ,response.data);
            console.log('response WITH DATA[0]: ', response.data[0]);
            var temp = response.data[0];
            var currentUserID = temp.userID;
            EncryptToLocalStorage("userId", currentUserID);
            console.log('currentUserID: ', currentUserID);
        });
        if(!auth) {
            setError(true);
        }
        console.log("clicked! email: ", email, " password: ", password );
      };

    if (auth) {
        return (
            <Navigate to="/"></Navigate>
        )    
    }
    
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
                                    required
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </div>
                            <div className='login-input-wrapper'>
                                <TextField className='login-input' 
                                    label='Password' 
                                    variant='filled'
                                    required
                                    type="password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    helperText = {error ? "Invalid email and password combination" : ""}
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
                                    <button onClick={loginUser}>
                                        Login
                                    </button>
                            </div>
                        </div>
                </div>
        </div>
    );
}
export default Login;