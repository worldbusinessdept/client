import React, { useState } from "react";
import BankWithdrawalImage from "../Assets/BankWithdrawal.jpeg"

import "../css/Payment.css"
import ParticleAnimation from "./components/ParticleAnimation";
import axios from "axios"

import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
export default function BankWithdrawal() {

    let [acName, setAcName] = useState("");
    let [acNumber, setAcNumber] = useState("");
    let [bankName, setBankName] = useState("");
    let [swiftcode, setSwiftcode] = useState("");
    let [amount, setAmount] = useState("");
    let history = useHistory()

    let [withdrawButton, setWithdrawButton]=useState('Withdraw');


    function handleClick(e) {
        e.preventDefault();

        setWithdrawButton(<CircularProgress color="inherit" />);
        axios.post(`${process.env.REACT_APP_SERVER}/withdrawal`, { userId: JSON.parse(localStorage.getItem("data")).userId, amount: amount, mode: "Bank Withdrawal" , address: acNumber},
        {headers : {
            "Authorization" :`Bearer ${localStorage.getItem("token")}`}
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
            <h1 style={{ "width": "100%", "textAlign": "center" }} >Bank Withdrawal</h1>
            <form style={{ "marginTop": "50px" }} className="withdrawalCardImage">
                <img src={BankWithdrawalImage} alt="BankWithdrawal" />
                <input
                    type="text"
                    onChange={(e) => {
                        setAcName(e.target.value);
                    }}
                    value={acName}
                    placeholder="Account Name*"
                />
                <input
                    type="text"
                    onChange={(e) => {
                        setAcNumber(e.target.value)
                    }}
                    value={acNumber}
                    placeholder="Account Number*"
                />
                <input
                    type="text"
                    onChange={(e) => {
                        setBankName(e.target.value);
                    }}
                    value={bankName}
                    placeholder="Bank Name*"
                />
                <input
                    type="text"
                    onChange={(e) => {
                        setSwiftcode(e.target.value);
                    }}
                    value={swiftcode}
                    placeholder="Swift Code*"
                />
                <input
                    type="number"
                    onChange={(e) => {
                        setAmount(e.target.value)
                    }}
                    value={amount}
                    placeholder="Amount*"
                />
                <button onClick={handleClick} >{withdrawButton}</button>

            </form>
        </div>
    )
}