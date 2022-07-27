import React, { useState } from "react";
import "../../css/Payment.css"

import AdminNavbar from "./AdminNavbar";
import axios from "axios"
import swal from "sweetalert"

import CircularProgress from '@mui/material/CircularProgress';


export default function AdminBulkRegisterUser() {

    const [file, setFile] = useState();
    let [submitButton, setSubmitButton]=useState('Submit')
    const handleFileChange = e => {
        setFile(e.target.files[0])
    }

    function handleClick(e) {
        e.preventDefault();

        setSubmitButton(<CircularProgress color="inherit" />)

        if (file === undefined) {
            swal("No file selected", "Please select a xlsx file", "error")
            setSubmitButton("Submit")
        } else {

            const data = new FormData();
            data.append('file', file);

            axios.post(`${process.env.REACT_APP_SERVER}/adminbulkregisteruser`, data,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                    }
                })
                .then((response) => {
                    setSubmitButton('Submit')

                    setFile(null);
                    if (response.status === 200) {
                        swal("Success", `${response.data.message}`, "success")
                    } else if (response.status === 202) {
                        swal(`${response.data.error}`, `${response.data.message}`, "error")
                    }
                })
        }
    }


    return (
        <div className="payment" >

            <h2>Bulk Register User</h2>
            <AdminNavbar />
            <br />
            <br />
            <center><h3>Select excel sheet containing all users data</h3></center>
            <br />
            <center><input id="bulkUserFile" type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={handleFileChange} /></center>
            <br />
            <center><button onClick={handleClick}>{submitButton}</button></center>
            <br />
        </div>
    )
}