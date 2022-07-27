import React, { useEffect, useState } from "react";
import "../../css/Payment.css"

import AdminNavbar from "./AdminNavbar";
import axios from "axios";

import swal from "sweetalert"
import CircularProgress from '@mui/material/CircularProgress';

export default function AdminChangePaymentAddress() {
    let [address, setAddress] = useState("")

    let [currentAddress, setCurrentAddress] = useState("")
    let [submitButton, setSubmitButton] = useState('Submit')

    async function handleClick(e) {
        setSubmitButton(<CircularProgress color="inherit" />)
        e.preventDefault();

        await axios.post(`${process.env.REACT_APP_SERVER}/adminchangepaymentaddress`, { paymentAddress: address },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                }
            })
            .then(async (response) => {
                setSubmitButton('Submit');
                if (response.status === 202) {
                    swal(`${response.data.message}`, "", "error")
                } else if (response.status === 200) {
                    swal(`${response.data.message}`, "", "success")
                    setAddress("")
                }
            })
    }

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_SERVER}/admingetpaymentaddress`, { paymentAddress: address },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                }
            })
            .then(async (response) => {
                if (response.status === 202) {
                    swal(`${response.data.message}`, "", "error")
                } else if (response.status === 200) {
                    setCurrentAddress(response.data.paymentAddress)
                }
            })
    }, [submitButton, address])

    return (
        <div className="payment" >
            <h2>Change The Payment Address</h2>
            <AdminNavbar />
            <form>
                <h3>{`Current Address: ${currentAddress}`}</h3>
                <input
                    type="text"
                    placeholder="Enter new payment address here"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />

                <button onClick={handleClick} >{submitButton}</button>
            </form>
        </div>
    )
}