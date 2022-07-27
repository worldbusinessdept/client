import React, { useState } from "react";
import "../../css/Payment.css"

import AdminNavbar from "./AdminNavbar";
import axios from "axios"
import swal from "sweetalert"

import CircularProgress from '@mui/material/CircularProgress';

export default function AdminSendInterest() {


    let [password, setPassword] = useState("")
    let [percentage, setPercentage] = useState("")
    let [reason, setReason] = useState("")


    let [bulkCreditButton, setBulkCreditButton]=useState('Interest Credit');
    // eslint-disable-next-line
    let [bulkDebitButton, setBulkDebitButton]=useState("Interest Debit")


    function handleCredit(e) {
        e.preventDefault();
        setBulkCreditButton(<CircularProgress color="inherit" />)
        axios.post(`${process.env.REACT_APP_SERVER}/adminsendinterest`, { password: password, action: "credit", percentage: percentage, reason: reason },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                }
            })
            .then((response) => {
                setBulkCreditButton('Interest Credit')
                if (response.status === 200) {
                    swal(`${response.data.message}`, "", "success");
                    setPassword("");
                    setPercentage("");
                    setReason("");
                } else if (response.status === 202) {
                    swal(`${response.data.message}`, "", "error")
                } else {
                    swal("Error!", "", "error")
                }
            })
    }
    // eslint-disable-next-line
    function handleDebit(e) {
        e.preventDefault();

        setBulkDebitButton(<CircularProgress color="inherit" />)
        axios.post(`${process.env.REACT_APP_SERVER}/adminbulktransferaction`, { password: password, action: "debit", percentage: percentage, reason: reason },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                }
            })
            .then((response) => {
                setBulkDebitButton("Bulk Debit")
                if (response.status === 200) {
                    swal(`${response.data.message}`, "", "success");
                    setPassword("");
                    setPercentage("");
                    setReason("");
                } else if (response.status === 202) {
                    swal(`${response.data.message}`, "", "error")
                } else {
                    swal("Error!", "", "error")
                }
            })
    }
    return (

        <div className="payment" >

            <h2>Send Interest</h2>
            <AdminNavbar />

            <form>
                <input
                    type="password"
                    placeholder="Admin Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Percentage"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                />
                <button onClick={handleCredit} >{bulkCreditButton}</button>

            </form>

        </div>
    )
}