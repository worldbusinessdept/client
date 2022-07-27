import React, { useState } from "react";
import "../../css/Payment.css"

import ParticleAnimation from "../components/ParticleAnimation";
import { CountryDropdown} from 'react-country-region-selector';
import PaymentSecured from "../../Assets/PaymentSecured.jpeg"
import { useHistory } from "react-router-dom";
import Titanium from "../../Assets/Cards/TitaniumMasterCard.png"

export default function MerchantMasterCard() {

    let history = useHistory();
    function handleClick() {
        history.push("/bitcoinaccepted")
    }

    let [country, setCountry] = useState();
    return (
        <div className="payment" >
            <ParticleAnimation />

            <h2 >Titanium Master Card</h2>
            <form className="withdrawalCardImage">
                <img src={Titanium} alt="Titanium" />
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
                <div style={{ "width": "80%" }} >

                    <CountryDropdown
                        value={country}
                        onChange={(val) => setCountry(val)} />
                </div>
                <button onClick={handleClick} >Proceed to payment</button>
            </form>
            <br />
            <div style={{ "width": "100%", "textAlign": "center" }} >

                <img style={{ "width": "100%" }} src={PaymentSecured} alt="PaymentSecured" />
            </div>
        </div>
    )
}