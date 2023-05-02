import React from "react";
import "../css/navigation.css";
import { Link } from 'react-router-dom'

const Footer = () => {
    const reset = () => {
        window.scrollTo(0,0);
    }

    return (
        <div className="footer">
            <div>
                <div>
                    <div className="footer-links">
                        <td><Link to="/" class="nav-link-footer">Dashboard</Link>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</td>
                        <td><Link to="#top" class="nav-link-footer" onClick={reset}>Back To Top</Link></td>
                    </div>
                </div>
            </div>
        </div>
    )
    }

export default Footer;