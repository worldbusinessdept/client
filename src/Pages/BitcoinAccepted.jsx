import React, { useEffect, useState } from "react";
import "../css/Payment.css"

import BitcoinAcceptedHere from "../Assets/BitcoinAccepted.jpeg"
import { useHistory } from "react-router-dom";

import PaymentSecured from "../Assets/PaymentSecured.jpeg"
import ParticleAnimation from "./components/ParticleAnimation";
import "../css/BitcoinAccepted.css"
import QRCode from 'qrcode.react';
import axios from "axios";


export default function BitcoinAccepted() {

    let [timer, setTimer] = useState("300")

    let [paymentAddress, setPaymentAddress]=useState('')
    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(seconds => seconds - 1)

            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
        // eslint-disable-next-line
    }, []);
    
    useEffect(()=>{
        if (timer <= 0) {
            history.push("/user/dashboard");
        }
        // eslint-disable-next-line
    }, [timer])



    useEffect(()=>{

        axios.get(`${process.env.REACT_APP_SERVER}/admingetpaymentaddress`)
        .then(response=>setPaymentAddress(response.data.paymentAddress))
        .catch(error=>console.log(error));
    },[])



    let history = useHistory();
    function handleClick() {
        history.push("user/dashboard")
    }
    return (
        <div className="payment bitcoinAccepted">
            <ParticleAnimation />

            <h2>Bitcoin Accepted</h2>
            <form style={{ "marginTop": "40px" }} >


                <img src={BitcoinAcceptedHere} alt="BitcoinAccepted" />

                <br />
                <h2>SCAN OR COPY ADDRESS TO PAY</h2>
                <br />
                {/* <img src={QR} alt="Qr" /> */}
                <QRCode value={paymentAddress} includeMargin size='200' id="qr" />
                <h3 style={{ "width": "80%", "textAlign": "center", "wordWrap": "break-word" }} >{paymentAddress}</h3>
                <p>Make payment within:  <b style={{ "color": "orange", "fontSize":"28px" }}>{timer}</b> seconds to activate your debit card.</p>
                <br />
                <p style={{ "color": "#DF2D07" }} >Note: After payment please send the  payment receipt or screenshot to</p>
                <a href="mailto:swiftbusinesspay@gmail.com" style={{ "color": "#EF9228" }} >swiftbusinesspay@gmail.com</a>
                <br />
                <p>Your debit card will be activated within 24 hours after payment and also you will get back your card activation fees in your account.</p>
                <p>For further information contact at <a href="mailto:swiftbusinesspay@gmail.com" style={{ "color": "#EF9228" }}>swiftbusinesspay@gmail.com</a></p>
                <br />
                <button onClick={handleClick}>My Account</button>
                <br />
            </form>
            <div style={{ "width": "100%", "textAlign": "center" }} >

                <img style={{ "width": "100%" }} src={PaymentSecured} alt="PaymentSecured" />
            </div>
        </div>
    );
}