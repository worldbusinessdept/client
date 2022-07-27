import React, { useState } from "react";
import axios from "axios";

import "../../css/AdminActivatesAllCards.css"
import swal from "sweetalert"
import CircularProgress from '@mui/material/CircularProgress';

export default function AdminBalanceControlCard(props) {

    let [creditAmount, setCreditAmount] = useState("");
    let [debitAmount, setDebitAmount] = useState("");
    let [creditReason, setCreditReason] = useState("");
    let [debitReason, setDebitReason] = useState("")

    let [creditButton, setCreditButton] = useState('Credit');
    let [debitButton, setDebitButton] = useState('Debit');
    function handleCredit(e) {

        e.preventDefault();
        setCreditButton(<CircularProgress color="inherit" />)
        axios.post(`${process.env.REACT_APP_SERVER}/adminbalancecontrol`,
            {
                userId: props.userId,
                amount: creditAmount,
                action: "credit",
                reason: creditReason
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                }
            }
        ).then((response) => {

            setCreditButton('Credit');
            if (response.status === 200) {
                swal("Credited!", "Amount has been credited to users account.", "success");
                props.clickFunction();
                setCreditAmount("")
                setCreditReason("")
            } else if (response.status === 202) {
                swal(`${response.data.message}`, "", "error")
            } else {
                swal("Error!", "Credit unsussessful.", "error")
                props.clickfunction();
                setCreditAmount("")
                setCreditReason("")
            }
        })
    }
    function handleDebit(e) {

        e.preventDefault();

        setDebitButton(<CircularProgress color="inherit" />)
        axios.post(`${process.env.REACT_APP_SERVER}/adminbalancecontrol`,
            {
                userId: props.userId,
                amount: debitAmount,
                action: "debit",
                reason: debitReason
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                }
            }
        ).then((response) => {

            setDebitButton('Debit');
            if (response.status === 200) {
                swal("Debited!", "Amount has been debited to users account.", "success");
                props.clickFunction();
                setDebitAmount("")
                setDebitReason("")
            } else if (response.status === 202) {
                swal(`${response.data.message}`, "", "error")
            } else {
                swal("Error!", "Debit unsussessful.", "error")
                props.clickfunction();
                setDebitAmount("")
                setDebitReason("");
            }
        })
    }



    return (
        <div style={{ "border": "2px solid orange", "padding": "4px", "marginBottom": "11px" }} className="adminActivatesAllCards" >

            <div>First Name: <p>{props.fName}</p></div>
            <div>Last Name: <p>{props.lName}</p></div>
            <div>Email: <p>{props.email}</p></div>
            <div>Balance: <p>$ {props.balance}</p></div>

            <br />

            <div>Credit</div>
            <div>
                <input
                    type="number"
                    placeholder="Enter Amount"
                    value={creditAmount}
                    onChange={(e) => {
                        setCreditAmount(e.target.value)
                    }}
                />
                <input
                    type="text"
                    placeholder="Credit Reason"
                    value={creditReason}
                    onChange={(e) => {
                        setCreditReason(e.target.value)
                    }}
                />
                <button onClick={handleCredit} >{creditButton}</button>
            </div>
            <br />
            <div>Debit</div>
            <div>
                <input
                    type="number"
                    placeholder="Enter Amount"
                    value={debitAmount}
                    onChange={(e) => {
                        setDebitAmount(e.target.value)
                    }}
                />
                <input
                    type="text"
                    placeholder="Debit Reason "
                    value={debitReason}
                    onChange={(e) => {
                        setDebitReason(e.target.value)
                    }}
                />
                <button onClick={handleDebit} >{debitButton}</button>
            </div>
        </div>
    )
}