import React from "react";
import "../../css/Payment.css"

import Request from "../../Assets/RequestSent.jpg"
import { useHistory } from "react-router-dom";
import ParticleAnimation from "../components/ParticleAnimation";
// import { style } from "@mui/system";

export default function RequestSent(){

    let history=useHistory();

    return(
        <div className="payment" >
            <ParticleAnimation/>
        
            <form style={{"backgroundColor":"transparent", "marginTop":"10px"}} >
                <img src={Request} alt="Request Sent" />
                <h1>Request Sent !</h1>
                <br/>
                <p>Your registration request has sent successfully, and is now waiting for administrator approval. As soon as your request is approved you will receive a confirmation mail.</p>
                <button onClick={()=>{history.push("/login")} } style={{"width":"max-content"}} >Back to login</button>
            </form>
        </div>
    )
}