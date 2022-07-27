import React, { useState } from "react";
import "../../css/Payment.css"

import AdminNavbar from "./AdminNavbar";
import axios from "axios"
import swal from "sweetalert"

import CircularProgress from '@mui/material/CircularProgress';

export default function AdminBulkTransferAction() {


    let [password, setPassword] = useState("")
    let [amount, setAmount] = useState("")
    let [reason, setReason] = useState("")


    let [bulkCreditButton, setBulkCreditButton]=useState('Bulk Credit');
    let [bulkDebitButton, setBulkDebitButton]=useState('Bulk Debit')


    function handleCredit(e) {
        e.preventDefault();
        setBulkCreditButton(<CircularProgress color="inherit" />)
        axios.post(`${process.env.REACT_APP_SERVER}/adminbulktransferaction`, { password: password, action: "credit", amount: amount, reason: reason },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                }
            })
            .then((response) => {
                setBulkCreditButton('Bulk Credit')
                if (response.status === 200) {
                    swal(`${response.data.message}`, "", "success");
                    setPassword("");
                    setAmount("");
                    setReason("");
                } else if (response.status === 202) {
                    swal(`${response.data.message}`, "", "error")
                } else {
                    swal("Error!", "", "error")
                }
            })
    }
    function handleDebit(e) {
        e.preventDefault();

        setBulkDebitButton(<CircularProgress color="inherit" />)
        axios.post(`${process.env.REACT_APP_SERVER}/adminbulktransferaction`, { password: password, action: "debit", amount: amount, reason: reason },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                }
            })
            .then((response) => {
                setBulkDebitButton('Bulk Debit')
                if (response.status === 200) {
                    swal(`${response.data.message}`, "", "success");
                    setPassword("");
                    setAmount("");
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

            <h2>Bulk Transfer</h2>
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
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                />
                <button onClick={handleCredit} >{bulkCreditButton}</button>

                <button onClick={handleDebit}>{bulkDebitButton}</button>
            </form>

        </div>
    )
}