import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/Payment.css"

import ParticleAnimation from "./components/ParticleAnimation";
import axios from "axios"

import swal from "sweetalert"
import CircularProgress from '@mui/material/CircularProgress';

export default function Report() {

    let [yourEmail, setYourEmail] = useState(JSON.parse(localStorage.getItem("data")).email);

    let [reportEmail, setReportEmail] = useState("")
    let [reportReason, setReportReason] = useState("")
    let [reportAttachment, setReportAttachment] = useState()
    let history = useHistory();
    // eslint-disable-next-line
    let [postImageBase64, setPostImageBase64] = useState();
    let [submitButton, setSubmitButton]=useState('Submit')
    const data = new FormData();

    data.append('reportedBy', yourEmail);
    data.append('reportedAccount', reportEmail);
    data.append('reportReason', reportReason);
    data.append('image', reportAttachment);
    function handleClick(e) {
        e.preventDefault();
        setSubmitButton(<CircularProgress color="inherit" />);
        // console.log(data)


        axios.post(`${process.env.REACT_APP_SERVER}/sendreport`, data,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then((response) => {
                setSubmitButton('Submit')
                if (response.status === 200) {
                    swal(`${response.data.message}`, "", "success")
                        .then(() => {
                            history.push("/user/dashboard")
                        })
                } else if (response.status === 202) {
                    swal(`${response.data.message}`, "", "error")
                }
            })

    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })
    function handleFileChange(e) {

        // console.log(e.target.files[0])
        //We get the file in files[0]
        setReportAttachment(e.target.files[0]);
        const uploadedFile = e.target.files[0];
        toBase64(uploadedFile)
            .then((res) => {
                // console.log(res)
                setPostImageBase64(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (

        <div className="payment" >
            <div className="backButton">
                <i class="fas fa-chevron-circle-left" onClick={() => history.goBack()} />
            </div>
            <ParticleAnimation />
            <h2>Submit a Report</h2>
            <form encType="multipart/form-data" method="POST">
                <label>Your email address</label>
                <input
                    placeholder="Your email address"
                    value={yourEmail}
                    onChange={(e) => {
                        setYourEmail(e.target.value)
                    }}
                />
                <label>Report account email address</label>
                <input
                    placeholder="Report account email address"
                    value={reportEmail}
                    onChange={(e) => {
                        setReportEmail(e.target.value)
                    }}
                />
                <label>Report Reason</label>
                <textarea
                    placeholder="Report reason"
                    value={reportReason}
                    onChange={(e) => {
                        setReportReason(e.target.value)
                    }}
                />
                <label>Attachments</label>
                <input name="image" id="file-input" type="file" accept="image/*" onChange={handleFileChange} />
                <button onClick={handleClick} >{submitButton}</button>
            </form>
        </div>
    )
}