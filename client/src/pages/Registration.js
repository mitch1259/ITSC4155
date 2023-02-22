import '../css/login.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function Register() {
    return (
        <div className='parent-wrapper'>
            <div className="child-wrapper">
          <h3 className="main-header">Register</h3>
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
          <button>Register</button>
            </div>
        </div>
    );
}
export default Register;