import axios from "axios"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import swal from "sweetalert"
import "../../css/Payment.css"

import "../../css/VerifyOtp.css"

import ParticleAnimation from "../components/ParticleAnimation"
import CircularProgress from '@mui/material/CircularProgress';
export default function VerifyOtp() {

    let history = useHistory()
    let [otpTimer, setOtpTimer] = useState("300")

    let [i1, setI1] = useState();
    let [i2, setI2] = useState();
    let [i3, setI3] = useState();
    let [i4, setI4] = useState();
    let [i5, setI5] = useState();
    let [i6, setI6] = useState();

    let [verifyButton, setVerifyButton] = useState('Verify');

    useEffect(() => {
        const interval = setInterval(() => {
            if (otpTimer > 0) {
                setOtpTimer(seconds => seconds - 1)

            }
        }, 1000);
        return () => clearInterval(interval);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (otpTimer <= 0) {
            history.push("/");
        }
        // eslint-disable-next-line
    }, [otpTimer])

    function handleClick(e) {
        e.preventDefault();
        setVerifyButton(<CircularProgress color="inherit" />);

        let otp = i1 + i2 + i3 + i4 + i5 + i6;
        // console.log(otp)

        axios.post(`${process.env.REACT_APP_SERVER}/signupstep2`, { tempUserId: sessionStorage.getItem("tempUserId"), otp: otp })
            .then((response) => {
                
                setVerifyButton('Verify')
                if (response.status === 200) {
                    history.push("/signup/personalinformation");
                } else if (response.status === 202) {
                    swal(`${response.data.message}`, " ", "error")
                }
            })
    }



    return (
        <div className="payment otpDiv"  >

            <ParticleAnimation />
            <h2>Verify OTP</h2>
            <img src="https://cdn0.iconfinder.com/data/icons/cyber-security-flat-threat-protection/512/OTP-512.png" alt="Verify" />
            <p>Otp is valid for:  <b style={{ "color": "orange" }}>{otpTimer}</b> seconds</p>
            <form>
                <h3>Enter the 6 digit code sent to you via email.</h3>
                <div className="otp" >
                    <input type="number" maxLength="1" oninput="this.value=this.value.replace(/[^0-9]/g,'');" value={i1} onChange={(e) => { setI1(e.target.value) }} />
                    <input type="number" maxLength="1" oninput="this.value=this.value.replace(/[^0-9]/g,'');" value={i2} onChange={(e) => { setI2(e.target.value) }} />
                    <input type="number" maxLength="1" oninput="this.value=this.value.replace(/[^0-9]/g,'');" value={i3} onChange={(e) => { setI3(e.target.value) }} />
                    <input type="number" maxLength="1" oninput="this.value=this.value.replace(/[^0-9]/g,'');" value={i4} onChange={(e) => { setI4(e.target.value) }} />
                    <input type="number" maxLength="1" oninput="this.value=this.value.replace(/[^0-9]/g,'');" value={i5} onChange={(e) => { setI5(e.target.value) }} />
                    <input type="number" maxLength="1" oninput="this.value=this.value.replace(/[^0-9]/g,'');" value={i6} onChange={(e) => { setI6(e.target.value) }} />
                </div>
                <button onClick={handleClick} >{verifyButton}</button>
            </form>
        </div>
    )
}