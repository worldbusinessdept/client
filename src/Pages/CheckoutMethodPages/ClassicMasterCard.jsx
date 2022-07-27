import React from "react";
import "../../css/Payment.css"

import {useHistory} from "react-router-dom"
import Classic from "../../Assets/Cards/ClassicMasterCard.png"
import ParticleAnimation from "../components/ParticleAnimation"
export default function ClassicMasterCard() {

    let history=useHistory()
    function handleClick(){
        history.push("/bitcoinaccepted")
    }
    return (
        <div className="payment" >

            <h2 >Classic Master Card</h2>
            <ParticleAnimation/>
            <form className="withdrawalCardImage">
                <img src={Classic} style={{"borderRadius":"10px"}} alt="ClassicMasterCard" />
                <input
                    type="text"
                    placeholder="Full Name*"
                />
                <input
                    type="text"
                    placeholder="Last Name*"
                />
                <input
                    type="text"
                    placeholder="Email Address*"
                />
                <input
                    type="text"
                    placeholder="Phone*"
                />
                <input
                    type="text"
                    placeholder="Address*"
                />
                <button onClick={handleClick} >Proceed to payment</button>
            </form>
        </div>
    )
}