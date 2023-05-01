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
    //Global contect variable
    const { auth, setAuth } = useContext(AuthContext);
    
    //Local state variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    /*
    * Main code -
    * User-inputed data will be inserted into the local state variables.
    * Afterwords, an axios post will be called with the user data that will
    * attempt to look for a match in the database.
    * If a match is found, the user will be redirected to the dashboard page.
    */
    const loginUser = (e) => {
        e.preventDefault();
        const userData = {
            email: email,
            password: password
        }
        Axios.post('http://localhost:3002/api/loginUser', userData)
            .then((response) => {
                setError(false);
                var temp = response.data[0];
                setAuth(true);
                var currentUserID = temp.userID;
                EncryptToLocalStorage("userId", currentUserID);
            });
        //Conditional statement checks if user is authenticated, if not an error will be displayed to the user
        if (!auth) {
            setError(true);
        }
    };

    //Conditional statement checks if the user is authenticated or not to prevent the user from visiting pages they aren't supposed to
    if (auth) {
        return (
            <Navigate to="/"></Navigate>
        )
    }

    /*
  * Front end side of the page - 
  * Front end contains a series of TextFields and buttons and links for different purposes.
  * The text fields take in data for the components above, as well as, display errors if any
  * are found.
  * The buttons and links enable the components and redirect the users based on their role.
  */
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
                            //Assigns value in TextField to email local state variable
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>
                    <div className='login-input-wrapper'>
                        <TextField className='login-input'
                            label='Password'
                            variant='filled'
                            required
                            type="password"
                            //Assigns value in TextField to password local state variable
                            onChange={(e) => { setPassword(e.target.value) }}
                            //Error handling that displays error message if an error is found
                            helperText={error ? "Invalid email and password combination" : ""}
                        />
                    </div>
                </div>
                <div className='login-buttons-wrapper'>
                    {/* Link that will take the user to the registration page */}
                    <div className="login-link-wrapper">
                        <Link to="/registration">
                            <FancyButton buttonText="Register" />
                        </Link>
                    </div>
                    {/* Button will run the loginUser component that attempts to find the user within the database */}
                    <div className="login-link-wrapper">
                        <button onClick={loginUser} className='login-button'>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;