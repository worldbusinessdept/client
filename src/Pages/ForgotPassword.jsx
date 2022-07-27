import React, { useState } from "react";
import "../css/Payment.css"

import ParticleAnimation from "./components/ParticleAnimation";
import axios from "axios"
import { useHistory } from "react-router-dom";

import CircularProgress from '@mui/material/CircularProgress';
export default function ForgotPassword() {

    let history = useHistory()
    let [email, setEmail] = useState();

    let [submitButton, setSubmitButton]=useState('Submit');
    function handleClick(e) {
        e.preventDefault();

        setSubmitButton(<CircularProgress color="inherit" />)
        axios.post(`${process.env.REACT_APP_SERVER}/handleotp`, { email: email },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then((response) => {
                setSubmitButton('Submit');
                sessionStorage.setItem("otpId", response.data.userId);
                history.push("/user/changepassword")
            })
    }





    return (
        <div className="payment" >
            <ParticleAnimation />
            <form>
                <h1>ForgotPassword</h1>
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <button onClick={handleClick} >{submitButton}</button>

            </form>
        </div>
    )
}