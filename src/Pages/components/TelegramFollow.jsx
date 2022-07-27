import React from "react";
import "../../css/WhatIs.css"

import TelegramImage from "../../Assets/TelegramImage.png"
import "../../css/Payment.css"

export default function TelegramFollow() {
    return (
        <div className="whatIs" id="whatIs" style={{"backgroundColor":"whitesmoke"}} >
            <img src={TelegramImage} alt="TelegramImage" style={{"width":"50%"}}/>
            <button className="customButtonOrange">
                
                Follow us on telegram <i class="fab fa-telegram"/>
            </button>
        </div>
    );
}