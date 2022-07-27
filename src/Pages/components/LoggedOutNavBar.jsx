import React from "react";
import "../../css/Navbar.css"

import { Link } from "react-router-dom";

export default function LoggedOutNavBar() {
    return (
        <div className="navbar">

            <div className="navbarLogo" >
                <Link to="/" >
                    <img src="https://swiftbusinesspay.site/wp-content/uploads/2021/10/PicsArt_09-24-01.22.38-scaled-1.jpg" alt="Logo" />

                </Link>
            </div>
            <div className="links" >
                <div>
                    <Link to="/signup" >
                        <p>SignUp</p>
                    </Link>
                </div>
                <div>
                    <Link to="/login" >
                        <p>LogIn</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}