import React, { useState } from "react";
import "../../css/Payment.css"
import { CountryDropdown } from 'react-country-region-selector';
import ParticleAnimation from "../components/ParticleAnimation";
import axios from "axios"
import { useHistory } from "react-router-dom"

import CircularProgress from '@mui/material/CircularProgress';
import swal from "sweetalert";
export default function PersonalInformation() {
    let history = useHistory();

    let [fName, setFName] = useState("");
    let [lName, setLName] = useState("");
    let [dob, setDob] = useState("");
    let [address, setAddress] = useState("");
    let [postalCode, setPostalCode] = useState("");
    let [country, setCountry] = useState("");
    let [mobile, setMobile]=useState("")
    let tempUserId = sessionStorage.getItem("tempUserId")
    let [image, setImage] = useState();
    // eslint-disable-next-line
    let [Id, setId] = useState();
    // eslint-disable-next-line
    let [postImageBase64, setPostImageBase64] = useState();
    let [submitButton, setSubmitButton] = useState('Submit')

    function handleClick(e) {
        e.preventDefault();
        setSubmitButton(<CircularProgress color="inherit" />);
        //Createing new form data
        const data = new FormData();

        //Apending the image to image json "image is name for the image input" json that is sent is {image: "theImage"}
        data.append('tempUserId', tempUserId);
        data.append('fName', fName);
        data.append('lName', lName);
        data.append('dob', dob);
        data.append('address', address);
        data.append('postalCode', postalCode);
        data.append('country', country);
        data.append('image', image);
        data.append('Id', Id);
        data.append('mobile', mobile)



        axios.post(`${process.env.REACT_APP_SERVER}/signupstep3`, data)
            .then((response) => {
                setSubmitButton('Submit')
                if (response.status === 200) {
                    sessionStorage.clear();
                    history.push("/signup/requestsent")
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
        setImage(e.target.files[0]);
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
            <ParticleAnimation />
            <h2>Enter your personal information.</h2>
            <form encType="multipart/form-data" method="POST">
                <label style={{ "color": "orange", "width": "80%", "textAlign": "left", "marginBottom": "0" }} >First Name</label>
                <input
                    type="text"
                    placeholder="First Name"
                    value={fName}
                    onChange={(e) => { setFName(e.target.value) }}
                />
                <label style={{ "color": "orange", "width": "80%", "textAlign": "left", "marginBottom": "0" }} >Last Name</label>
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lName}
                    onChange={(e) => { setLName(e.target.value) }}
                />
                <label style={{ "color": "orange", "width": "80%", "textAlign": "left", "marginBottom": "0" }} >Enter date of birth</label>
                <input
                    type="date"
                    value={dob}
                    onChange={(e) => { setDob(e.target.value) }}

                />
                <label style={{ "color": "orange", "width": "80%", "textAlign": "left", "marginBottom": "0" }} >Enter mobile number (WhatsApp numner is preferred)</label>
                <input
                    type="number"
                    value={mobile}
                    onChange={(e) => { setMobile(e.target.value) }}

                />
                <label style={{ "color": "orange", "width": "80%", "textAlign": "left", "marginBottom": "0" }} >Residential Address</label>
                <input
                    type="text"
                    placeholder="Residential Address"
                    value={address}
                    onChange={(e) => { setAddress(e.target.value) }}

                />
                <label style={{ "color": "orange", "width": "80%", "textAlign": "left", "marginBottom": "0" }} >Postal Code</label>
                <input
                    type="number"
                    placeholder="Postal Code"
                    value={postalCode}
                    onChange={(e) => { setPostalCode(e.target.value) }}

                />
                <CountryDropdown
                    value={country}
                    onChange={(val) => setCountry(val)} />
                <label style={{ "color": "orange", "width": "80%", "textAlign": "left", "marginBottom": "0" }} >Upload your national ID</label>
                <input name="image" id="file-input" type="file" accept="image/*" onChange={handleFileChange} />
                <button onClick={handleClick} >{submitButton}</button>
            </form>
        </div>
    )
}