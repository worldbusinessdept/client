import React, { useEffect, useState } from "react";
import "../css/Payment.css";

import "../css/UserAccount.css";
import ParticleAnimation from "./components/ParticleAnimation";
import axios from "axios"

import TextField from '@mui/material/TextField';
// eslint-disable-next-line
import Autocomplete from '@mui/material/Autocomplete';
import swal from "sweetalert"
import { useHistory } from "react-router-dom"

import CircularProgress from '@mui/material/CircularProgress';

export default function FundTransfer() {

    let localData = JSON.parse(localStorage.getItem("data"))
    let [userData, setUserData] = useState(localData)
    let [proceedButton, setProceedButton] = useState('Proceed to transfer')

    // eslint-disable-next-line
    let [allUsers, setAllUsers] = useState([]);
    let [email, setEmail] = useState("");
    let [amount, setAmount] = useState("")
    let [reason, setReason] = useState("")
    let [bitcoinData, setBitcoinData] = useState()
    let history = useHistory();
    function fetchData() {
        axios.post(`${process.env.REACT_APP_SERVER}/getuser`, { userId: localData.userId },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then((response) => {
                setUserData(response.data);
            })
    }
    useEffect(() => {
        axios.get("https://bitpay.com/api/rates")
            .then(async (response) => {
                // console.log(response.data)
                let oneBtc;
                response.data.forEach(element => {

                    if (element.code === "USD") {

                        oneBtc = element.rate;
                    }
                });
                // console.log(balance);
                // console.log(oneBtc);
                // console.log(1/oneBtc);
                // console.log(balance*(1/oneBtc));
                await setBitcoinData(parseFloat(userData.balance * (1 / oneBtc)).toFixed(8))
            })

    }, [userData.balance])
    useEffect(() => {
        fetchData();
        axios.get(`${process.env.REACT_APP_SERVER}/getalluser`)
            .then((response) => {
                let temp = [];
                // console.log(response.data);
                response.data.forEach(element => {
                    temp.push({
                        label: element.email
                    })
                });

                setAllUsers(temp);
            })
        // eslint-disable-next-line
    }, []);


    const data = {
        userId: JSON.parse(localStorage.getItem("data")).userId,
        targetEmail: email,
        amount: amount,
        reason: reason

    }
    function handleClick(e) {
        e.preventDefault();
        setProceedButton(<CircularProgress color="inherit" />);
        axios.post(`${process.env.REACT_APP_SERVER}/fundtransfer`, data,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then((response) => {
                setProceedButton('Proceed to transfer');
                if (response.status === 200) {

                    swal("Transfer complete!", "Amout has been deducted from your account.", "success")
                        .then(() => {
                            history.push("dashboard")
                        })
                } else if (response.status === 202) {
                    swal(`${response.data.message}`, "", "error")
                        .then(() => {
                            history.push("dashboard")
                        })
                } else {
                    swal("Error!", "An error has occured.", "error")
                }
            })
        setEmail("");
        setAmount("");
        setReason("");
    }
    // const top100Films = [
    //     { label: 'The Shawshank Redemption'}];
    return (
        <div className="payment">
            <div className="backButton" >
                <i class="fas fa-chevron-circle-left" onClick={() => history.goBack()} />
            </div>
            <ParticleAnimation />
            <br />

            <div className="bitcoinLive" >

                <div className="cards" style={{ "position": "static" }} >
                    <div className="border">
                        <h2>BALANCE</h2>
                        <h4>{userData.fName} {userData.className}</h4>
                        <h3>
                            $<span>{userData.balance}</span>
                        </h3>
                        <h3>
                            ₿<span className="btc">{bitcoinData}</span>
                        </h3>
                        <h3>
                            <span>A/C No. :</span>
                            {userData.accountNumber}
                        </h3>
                    </div>
                </div>
                <br />
                <div>
                    <div class="livecoinwatch-widget-1" lcw-coin="BTC" lcw-base="USD" lcw-secondary="BTC" lcw-period="d" lcw-color-tx="#ffffff" lcw-color-pr="#ff6900" lcw-color-bg="#1f2434" lcw-border-w="1" ></div>
                </div>
            </div>

            <form>
                {/* <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={allUsers}
                    sx={{ width: "100%" }}
                    onSelect={(e) => {
                        setEmail(e.target.value)
                        // console.log(e.target.value)
                    }}
                    renderInput={(params) => <TextField
                        {...params}
                        label="Whom to transfer(email address)"
                    // value={email}
                    // onChange={async (e)=>{
                    //     await setEmail(e.target.value);
                    //     // await console.log(e.target.value)
                    // }}
                    />}
                /> */}
                <TextField
                    type="email"
                    id="outlined-basic"
                    label="Whom to transfer(email address)"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <TextField
                    type="number"
                    id="outlined-basic"
                    label="Amount"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    value={amount}
                    onChange={(e) => {
                        setAmount(e.target.value);
                    }}
                />
                <TextField
                    type='text'
                    id="outlined-basic"
                    label="What's this for "
                    variant="outlined"
                    sx={{ width: "100%"}}
                    value={reason}
                    onChange={(e) => {
                        setReason(e.target.value)
                    }}
                />
                <button onClick={handleClick} style={{width: '50%', alignSelf: 'flex-start'}} >{proceedButton}</button>
            </form>
        </div>
    );
}
