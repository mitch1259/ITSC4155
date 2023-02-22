import React from "react";
import "../css/navigation.css";

const Header = () => {
    return (
        <div className="header">
            <table>
                <tr>
                    <td><h1 className="BudgIt"> <a href="\" class="nav-link">&nbsp;BudgIt</a></h1></td> 
                    <td><h3 className="Links"> <a href="\" class="nav-link">Dashboard</a> | <a href="#" class="nav-link">Savings Boards</a> | <a href="/" class="nav-link">Profile</a>&nbsp;&nbsp;</h3></td>
                </tr>
            </table>
        </div>
    )
    }

export default Header;