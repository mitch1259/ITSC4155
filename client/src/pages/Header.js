import React from "react";
import "../css/navigation.css";
import { Link } from 'react-router-dom';

// images
import StickMan from '../images/stickman.jpg';
import BudgItLogo from '../images/budgit-logo.png';

const Header = (props) => {
    return (
        <div className="header">
            <table>
                <tr>
                    <td>
                        <h1 className="BudgIt">
                            <Link to="/" className="nav-logo">
                                <img src={BudgItLogo} className="nav-logo-picture" />
                                &nbsp;BudgIt
                            </Link>
                        </h1>
                    </td> 
                    <td>
                        <div className="Links"> 
                            <Link to="/" className="nav-link">Dashboard</Link> | 
                            <Link to="#" className="nav-link">Savings Boards</Link> | 
                            <Link to="/profile" className="nav-link">
                                Profile
                                {/* If the user has a profile picture, display the profile picture, else display default Stickman image */}
                                <img className="nav-user-profile-picture" src={props.userProfilePicture ? props.userProfilePicture : StickMan} />
                            </Link>&nbsp;&nbsp;
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    )
    }

export default Header;