import '../css/login.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import FancyButton from '../components/navigation/FancyButton';
import BudgitLogo from '../images/budgit-logo-colour.png';
import { TextField } from '@mui/material';
<<<<<<< HEAD

function Login() {
=======
import SetCookie from '../context/cookies/setCookie';
import AuthContext from '../context/AuthProvider';
import EncryptToLocalStorage from '../context/encryption/EncryptToLocalStorage';
import { Navigate, Outlet } from 'react-router-dom';
// import { useCookies } from 'react-cookie';

function Login() {
    
    const { auth, setAuth } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [cookies, setCookie] = useCookies(['user']);

    const loginUser = (e) => {
        e.preventDefault();
        const userData = {
            email: email,
            password: password
        }
        Axios.post('http://localhost:3002/api/loginUser', userData)
        .then((response) => {
            console.log('received response: ', response.data);
            setAuth(true);
            console.log('response NO DATA: ', response);
            console.log('response WITH DATA: ' ,response.data);
            console.log('response WITH DATA[0]: ', response.data[0]);
            var temp = response.data[0];
            var currentUserID = temp.userID;
            EncryptToLocalStorage("userId", currentUserID);
            // localStorage.setItem("userId",currentUserID);
            console.log('currentUserID: ', currentUserID);
            // setCurrentUser(currentUserID);
            // console.log('currentUser state: ', currentUser);
            // setCookie('Email', email, { path: '/' });
            // setCookie('Password', password, { path: '/' });
            // var user = temp.map((val) => {
            //     userID: val.userID
            // });
            // console.log(user);
            // console.log(currentUser);
            // SetCookie('user', temp.userID);
        });
        console.log("clicked! email: ", email, " password: ", password );
      };

    if (auth) {
        return (
            <Navigate to="/"></Navigate>
        )    
    }
    
>>>>>>> 4a9999915ae631fd88c09e66dfb814182c889509
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
                    
<<<<<<< HEAD
=======
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
                                        <Link to="/">
                                            Login 
                                        </Link>
                                    </button>
                            </div>
                        </div>

>>>>>>> 4a9999915ae631fd88c09e66dfb814182c889509
                </div>
        </div>
    );
}
export default Login;