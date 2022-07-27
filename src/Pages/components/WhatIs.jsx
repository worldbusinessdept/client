import React from "react";
import "../../css/WhatIs.css"

import Bitcoin from "../../Assets/Bitcoin.png"
import "../../css/Payment.css"
import { Link } from "react-router-dom"

export default function WhatIs() {
    return (
        <div className="whatIs" id="whatIs">
            <div className="whatIsContent" >
                <h1>WHAT IS WBP?</h1>
                <h3>BCX, a utility token backed by World Business Pay, forms the backbone of World Business Pay ecosystem. Our community in helping us build out World Business Pay, and reward them accordingly for contributing to our success. This helps us stay true to the ethos of cryptocurrency and blockchain – to share the rewards of World Business Pay success with our early adopters and supporters.</h3>
                <img src={Bitcoin} alt="Bitcoin" />
            </div>
            <Link to="/signup" style={{ "width": "100%" }}>
                <button className="customButton">Sign Up</button>
            </Link>
        </div>
    );
}