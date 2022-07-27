import React, { useState } from "react";
import "../../css/Payment.css"

import { CountryDropdown } from 'react-country-region-selector';
import AdminNavbar from "./AdminNavbar";
import axios from "axios";

import swal from "sweetalert"
import CircularProgress from '@mui/material/CircularProgress';

export default function AdminSingleUserRegistration() {

    let [fName, setFName] = useState("")
    let [lName, setLName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [country, setCountry] = useState("")
    let [submitButton, setSubmitButton]=useState('Submit')

    async function handleClick(e) {
        setSubmitButton(<CircularProgress color="inherit" />)
        e.preventDefault();
        let data = {
            fName: fName,
            lName: lName,
            email: email,
            password: password,
            country: country
        }
        await axios.post(`${process.env.REACT_APP_SERVER}/adminsingleuserregister`, data,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                }
            })
            .then(async (response) => {
                setSubmitButton('Submit');
                if (response.status === 202) {
                    swal(`${response.data.message}`, "", "error")
                }else if(response.status===200){
                    swal(`${response.data.message}`, "", "success")
                }
            })
    }


    return (
        <div className="payment" >
            <h2>Single Registration</h2>
            <AdminNavbar />
            <form>
                <input
                    type="text"
                    placeholder="First Name"
                    value={fName}
                    onChange={e => setFName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lName}
                    onChange={e => setLName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <CountryDropdown
                    value={country}
                    onChange={(val) => setCountry(val)} />
                <button onClick={handleClick} >{submitButton}</button>
            </form>
        </div>
    )
}