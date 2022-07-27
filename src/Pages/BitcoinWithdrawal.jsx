import React, { useState } from "react";
import Bitcoin from "../Assets/BitcoinWithdrawal.jpeg"

import "../css/Payment.css"
import ParticleAnimation from "./components/ParticleAnimation"
import axios from "axios"

import swal from "sweetalert"
import { useHistory } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
export default function BitcoinWithdrawal() {

    let [fullName, setFullName] = useState();
    let [email, setEmail] = useState();
    let [amount, setAmount] = useState("");
    let [bitcoinAddress, setBitcoinAddress] = useState("");
    let [withdrawButton, setWithdrawButton]=useState('Withdraw');
    let history = useHistory()

    function handleClick(e) {
        e.preventDefault();
        setWithdrawButton(<CircularProgress color="inherit" />);
        axios.post(`${process.env.REACT_APP_SERVER}/withdrawal`, { userId: JSON.parse(localStorage.getItem("data")).userId, amount: amount, mode: "Bitcoin Withdrawal", address: bitcoinAddress },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then((response) => {
                setWithdrawButton('Withdraw')
                if (response.status === 200) {
                    swal("Withdrawal Complete!", "Withdrawal amount has been deducted from your balance.", "success")

                    .then(()=>history.push("/user/dashboard"));
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

            <h1 style={{ "width": "100%", "textAlign": "center" }} >Bitcoin Withdrawal</h1>
            <form style={{ "marginTop": "50px" }} className="withdrawalCardImage">
                <img src={Bitcoin} alt="BankWithdrawal" />
                <input
                    type="text"
                    onChange={(e) => {
                        setFullName(e.target.value);
                    }}
                    value={fullName}
                    placeholder="Full Name*"
                />
                <input
                    type="text"
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    value={email}
                    placeholder="Email*"
                />
                <input
                    type="number"
                    onChange={(e) => {
                        setAmount(e.target.value);
                    }}
                    value={amount}
                    placeholder="Amount*"
                />
                <input
                    type="text"
                    onChange={(e) => {
                        setBitcoinAddress(e.target.value);
                    }}
                    value={bitcoinAddress}
                    placeholder="Bitcoin Address*"
                />
                <button onClick={handleClick} >{withdrawButton}</button>

            </form>
        </div>
    )
}