import React from "react";
import "../../css/Payment.css"

import "../../css/SecureAccount.css"
import Secure from "../../Assets/SecureAccount.jpg"
import ParticleAnimation from "../components/ParticleAnimation";

export default function SecureAccount() {
    return (

        <div className="payment" >
            <ParticleAnimation/>
            <form style={{"backgroundColor":"transparent"}} >
                <img src={Secure} alt="SecureAccount" />
                <br />
                <b style={{ "fontSize": "larger", "textAlign": "center", "width": "80%" }} >Let's secure your account</b>
                <br />
                <div className="secureAccount" style={{ "width": "80%", "display":"flex", "alignItems":"center", "flexDirection":"column" }}>
                    <div>
                        <h3><i class="fas fa-plus-circle" /></h3>
                        <h3>Create your account</h3>
                        <h3 style={{"color":"orange"}} >Completed</h3>
                    </div>
                    <div>
                        <h3><i class="fas fa-shield-alt"/></h3>
                        <h3>Secure your account</h3>
                        <h3 style={{"color":"orange"}} >Remaining</h3>
                    </div>
                    <div>
                        <h3><i class="fas fa-fingerprint" /></h3>
                        <h3>Verify your identity</h3>
                        <h3 style={{"color":"orange"}} >Remaining</h3>
                    </div>
                </div>
                <button>Start</button>
            </form>
        </div>
    )
}