import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/Payment.css"
import ParticleAnimation from "./components/ParticleAnimation";
import swal from "sweetalert";
import axios from "axios";

import CircularProgress from '@mui/material/CircularProgress';
export default function Support() {

    let [yourEmail, setYourEmail] = useState(JSON.parse(localStorage.getItem("data")).email);

    // eslint-disable-next-line
    let [postImageBase64, setPostImageBase64] = useState();
    let [supportAttachment, setSupportAttachment] = useState();
    let [subject, setSubject] = useState("")
    let [description, setDescription] = useState("")
    let history = useHistory();
    let [submitButton, setSubmitButton]=useState('Submit')


    function handleClick(e) {
        e.preventDefault();
        setSubmitButton(<CircularProgress color="inherit" />);

        //Createing new form data
        const data = new FormData();

        //Apending the image to image json "image is name for the image input" json that is sent is {image: "theImage"}
        data.append('subject', subject);
        data.append('email', yourEmail);
        data.append('description', description);
        data.append('image', supportAttachment);



        axios.post(`${process.env.REACT_APP_SERVER}/sendsupport`, data,
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
        setSupportAttachment(e.target.files[0]);
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
            <h2>Submit a request</h2>
            <form encType="multipart/form-data" method="POST">
                <label>Subject</label>
                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
                <label>Your email address</label>
                <input
                    type="email"
                    placeholder="Your email address"
                    value={yourEmail}
                    onChange={(e) => {
                        setYourEmail(e.target.value)
                    }}
                />

                <label>Description</label>
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label>Attachments</label>
                <input name="image" id="file-input" type="file" accept="image/*" onChange={handleFileChange} />
                <button onClick={handleClick} >{submitButton}</button>
            </form>
        </div>
    )
}