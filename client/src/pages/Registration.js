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
  //Global context variable
  const { auth, setAuth } = React.useContext(AuthContext);


  //Local state variables

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [emailArray, setEmailArray] = useState([]);


  /*
  * Component that runs upon landing on the page that grabs all the emails
  * from the database and stores them to help the application find duplicate emails
  */
  useEffect(() => {
    const getEmails = async () => {
      try {
        const response = await Axios.get('http://localhost:3002/api/get-emails');
        setEmailArray(response.data);
      } catch {
        console.error(error);
      }
    };
    //call the above event
    getEmails();
  }, []);

  //Email validation that uses RegEx to validate the email is a proper email

  function validateEmail(email) {
    var re = (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return re.test(email);
  }


  /*
  * Password validation that uses RegEx to validate the passwords
  * The passwords will require users to have password between 7-15 characters,
  * at least 1 lowercase, uppercase, and special character as well as at
  * least one number
  */

  function validatePassword(password) {
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    return re.test(password);
}

  /*
  * Main handling code - 
  * Code will look for certain requirement for each of the different components
  * of the registration (Firstname, Lastname, email, password, and confirm password).
  * After all requirements are met, an Axios post is called to insert the data into the database
  * and user will be redirected to the login page is everything was successful
  */
  const registerUser = () => {
    /*
    * Series of if statements check for problems in data and, if any is found, it will be handled accordingly -
    * If the password/confirmPassword contain nothing, don't match, or don't meet the password standards - the user will be warned of the specific problem
    * If the email contains nothing, doesn't meet the email standards, or already exists in the database - the user wll be warned of the specific problem
    * If the firstname or lastname values are empty, then they will throw an error and warn the user
    */
    if (password.length == 0 || confirmPassword.length == 0 || password != confirmPassword || validatePassword(password) == false) {
      setError(true);
    }
    else if (email.length == 0 || validateEmail(email) == false || emailArray.includes(email) == true) {
      setError(true);

    }
    else if (firstName.length == 0) {
      setError(true);
    }
    else if (lastName.length == 0) {
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
        //window.location = 'http://localhost:3000/login';
      });

    }
  };


  //Conditional statement checks if the user is authenticated or not to prevent the user from visiting pages they aren't supposed to

  if (auth) {
    return (
      <Navigate to="/" />
    )

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

            />
            <TextField
              name="lastName"
              className='register-input-half-right'
              label='Last Name'
              variant='filled'

            />
          </div>
          <div className='register-input-form-wrapper'>
            <div className='register-input-wrapper-full'>
              <TextField

                name="email"
                className='register-input-full'
                label='Email Address'
                variant='filled'

              />
            </div>
            <div className='register-input-wrapper-full'>
              <TextField
                name="password"
                className='register-input-full'
                type="password"
                label='Password'
                variant='filled'

                error={error && password != confirmPassword || error && password.length == 0 || error && confirmPassword.length == 0}
              />
            </div>
            <div className='register-input-wrapper-full'>
              <TextField
                name="confirmPassword"
                className='register-input-full'
                label='Confirm Password'
                variant='filled'
                type="password"

              />
            </div>
          </div>
          <div className='login-buttons-wrapper'>
            {/* Link that will take the user back to the login page */}
            <Link to="/login">
              <p className='register-go-back'>Already have an account? Click here!</p>
            </Link>
            {/* Button will attempt run the registerUser component that attempts to enter the user-inputted data into the database */}
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