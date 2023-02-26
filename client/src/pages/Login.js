import '../css/login.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className='login-wrapper'>
            <div className='parent-wrapper'>
                <div className="child-wrapper">
                    <h1 className="main-header">Welcome to BudgIt</h1>
                    <h3 className='lines'>------------------------------------------------</h3>
                    <h3 className='explainitory'>Login to start saving!</h3><br></br>
                    <label>Email Address</label><br></br>
                    <input type="text" className="email"></input><br></br>
                    <label>Password</label><br></br>
                    <input type="text" className="password"></input><br></br>
                    <Link to="/registration">
                        <button className='register-button'>Register</button>
                    </Link>
                    <Link to="/">
                        <button className='login-button'>Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default Login;