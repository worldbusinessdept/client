import React, { useState } from "react";
import "../../css/Payment.css"

import ParticleAnimation from "../components/ParticleAnimation";
import swal from "sweetalert"
import axios from "axios"
import { useHistory } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

export default function Paypal() {

    let [amount, setAmount] = useState("");
    let history = useHistory();
    let [email, setEmail]=useState("");
    let [withdrawButton, setWithdrawButton] = useState('Withdraw');

    function handleClick(e) {
        e.preventDefault();
        setWithdrawButton(<CircularProgress color="inherit" />);
        axios.post(`${process.env.REACT_APP_SERVER}/withdrawal`, { userId: JSON.parse(localStorage.getItem("data")).userId, amount: amount, mode: "Paypal Withdrawal", address: email },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then((response) => {
                setWithdrawButton('Withdraw')

                if (response.status === 200) {
                    swal("Withdrawal Complete!", "Withdrawal amount has been deducted from your balance.", "success")
                        .then(() => history.push("/user/dashboard"));
                } else if (response.status === 203) {

                    swal({
                        title: "Oops! Your card is inactive!",
                        text: "Your withdrawal is not allowed. Please activate your debit card for withdrawal",
                        icon: "error",
                        button: "Activate Now ",
                    })
                        .then(() => {
                            history.push("/card");
                        })
                } else if (response.status === 202) {

                    swal(`${response.data.message}`, "", "error")
                }

            })
    }



    return (
        <div className="payment" >
            <div className="backButton">
                <i class="fas fa-chevron-circle-left" onClick={() => history.goBack()} />
            </div>
            <ParticleAnimation />
            <h1 style={{ "width": "100%", "textAlign": "center" }} >Withdraw using Paypal</h1>
            <form style={{ "marginTop": "20px" }} className="withdrawalCardImage">
                <br />
                <br />
                <img src="https://i.pcmag.com/imagery/reviews/068BjcjwBw0snwHIq0KNo5m-15..v1602794215.png" alt="Paypal" />
                <input
                    type="text"
                    placeholder="Full Name*"
                />
                <input
                    type="text"
                    placeholder="Paypal Email Address*"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                />
                <input
                    type="number"
                    placeholder="Amount*"
                    value={amount}
                    onChange={(e) => {
                        setAmount(e.target.value)
                    }}
                />
                <button onClick={handleClick} >{withdrawButton}</button>
                <br />
                <br />
            </form>
        </div>
    )
}