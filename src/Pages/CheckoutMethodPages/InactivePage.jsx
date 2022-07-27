import React from "react";
import "../../css/Payment.css"

import Classic from "../../Assets/Cards/ClassicMasterCard.png"
export default function InactivePage(){
    return(
        <div className="payment" style={{"textAlign":"center", "height":"100vh", "backgroundColor":"black"}} >

            <img src={Classic} alt="ClassicMasterCard" style={{"width":"26%"}}/>
            <br/>
            <br/>
            <h2>Oops! Your card is inactive.</h2>
            <br/>
            <h3>Your withdrawal is not allowed. Please activate your debit card for withdrawal.</h3>
            <br/>
            <button style={{"width":"40%", "borderRadius":"20px"}} >Activate Now</button>
        </div>
    );
}