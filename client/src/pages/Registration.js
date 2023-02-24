import '../css/login.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function Register() {
    return (
        <div className='parent-wrapper'>
            <div className="child-wrapper">
            <h1 className="main-header">Welcome to BudgIt</h1>
            <h3 className='lines'>------------------------------------------------</h3>
            <h3 className='explanitory'>Sign up and start saving!</h3><br></br>
          <label>First Name</label><br></br>
          <input type="text" className='first-name'></input><br></br>
          <label>Last Name</label><br></br>
          <input type="text" className='last-name'></input><br></br>
          <label>Email Address</label><br></br>
          <input type="text" className="email"></input><br></br>
          <label>Password</label><br></br>
          <input type="text" className="password"></input><br></br>
          <label>Confirm Password</label><br></br>
          <input type="text" className="confirm-password"></input><br></br><br></br>
          <p>Already have an account?<br></br>Click here!
                <button className='create-account'>Signup</button>
          </p>
          
            </div>
        </div>
    );
}
export default Register;