import React, { useState } from "react";
import "../css/Payment.css"

import ParticleAnimation from "./components/ParticleAnimation";
import axios from "axios";
import swal from "sweetalert";

import { useHistory } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

export default function ChangePassword() {

    let [password, setPassword] = useState("");
    let [cPassword, setCPassword] = useState("")
    let [otp, setOtp] = useState("")
    let otpId = sessionStorage.getItem("otpId")
    let history = useHistory()
    let [changePasswordButton, setChangePasswordButton]=useState('Change Password')

    const data = {
        password: password,
        cPassword: cPassword,
        otpId: otpId,
        otp: otp
    }
    function handleClick(e) {

        e.preventDefault();

        setChangePasswordButton(<CircularProgress color="inherit" />)
        axios.post(`${process.env.REACT_APP_SERVER}/changepassword`, data,
            {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("otpId")}`
                }
            })
            .then((response) => {
                setChangePasswordButton('Change Password')
                if (response.status === 200) {

                    swal(`${response.data.message}`, "", "success")
                        .then(() => {
                            history.push("/login")
                        })
                } else if (response.status === 202) {
                    swal(`${response.data.message}`, "", "error")

                }
            })

    }
    return (

        <div className="payment" >
            <ParticleAnimation />
            <h2>Change Password</h2>
            <p>Please check your mailbox!</p>
            <form>
                <input
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => { setOtp(e.target.value) }}
                />
                <input
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <input
                    placeholder="Confirm Password"
                    value={cPassword}
                    onChange={(e) => { setCPassword(e.target.value) }}
                />
                <button onClick={handleClick} >{changePasswordButton}</button>
            </form>

        </div>
    )
}