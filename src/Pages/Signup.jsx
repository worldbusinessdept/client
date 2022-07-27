import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import axios from "axios";
import swal from "sweetalert";


import "../css/Payment.css"
// import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import ParticleAnimation from "./components/ParticleAnimation"
import CircularProgress from '@mui/material/CircularProgress';

export default function Signup() {

    // let [username, setUsername] = useState("");
    let [fName, setFName] = useState("");
    let [lName, setLName] = useState("");
    // let [mobile, setMobile] = useState("");
    let [email, setEmail] = useState("");
    // let [otp, setOtp] = useState("");
    let [password, setPassword] = useState("");
    let [cPassword, setCPassword] = useState("");
    // let [gender, setGender] = useState("")
    // let [city, setCity] = useState("")
    // let [country, setCountry] = useState("")
    // let [verifyOtp, setVerifyOtp] = useState("")
    // let [timeStamp, setTimeStamp] = useState("")
    let [image, setImage] = useState();
    // eslint-disable-next-line
    let [postImageBase64, setPostImageBase64] = useState();
    let [registerButton, setRegisterButton]=useState('Register')
    //Createing new form data
    const data = new FormData();

    //Apending the image to image json "image is name for the image input" json that is sent is {image: "theImage"}
    data.append('fName', fName);
    data.append('lName', lName);
    data.append('email', email);
    data.append('password', password);
    data.append('cPassword', cPassword);
    data.append('image', image);

    let history = useHistory()
    // async function handleSubmit(e) {
    //     e.preventDefault();
    //     var today = new Date();
    //     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //     if (time > timeStamp) {
    //         swal("OTP Expired!", "Please try again by entering new OTP", "error");
    //     }
    //     else if (otp !== verifyOtp) {
    //         // alert("Invalid otp");
    //         swal("Invalid OTP!", "Please check the OTP and try again.", "error");
    //     } else {
    //         if (password === cPassword) {
    //             axios.post("http://localhost:5000/createuser", data)
    //                 .then((response) => {
    //                     console.log(response.data);
    //                     if (response.data.status === 200) {
    //                         swal("Registered!", "Your account has been registered.", "success")
    //                     }else if(response.data.status===409){
    //                         swal("Already exists!", "This email is already registered please log in.", "error")
    //                     } else {
    //                         swal("Error", "An error occurred, please try again.", "error")
    //                     }
    //                 });
    //         } else {
    //             // alert("Password do not match");
    //             swal("Passwords do not match!", "Please check the password and try again.", "error");
    //         }
    //     }
    // }



    // function selectLocationBoxChange() {
    //     var selectBox = document.getElementById("selectLocationBox");
    //     var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    //     setCountry(selectedValue);
    // }
    // function selectGenderBoxChange() {
    //     var selectBox = document.getElementById("selectGender");
    //     var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    //     // alert(selectedValue);
    //     setGender(selectedValue);
    // }

    function handleClick(e) {
        e.preventDefault();
        setRegisterButton(<CircularProgress color="inherit" />);
        if (password !== cPassword) {
            swal("Password do not match!", "Please check your password and try again.", "error")
        } else {

            axios.post(`${process.env.REACT_APP_SERVER}/signupstep1`, data)
                .then((response) => {

                    setRegisterButton('Register')
                    if (response.status === 200) {
                        sessionStorage.setItem("tempUserId", response.data.userId);
                        history.push("/signup/verifyotp")
                    } else if (response.status === 202) {
                        swal(`${response.data.error}`, `${response.data.message}`, "error")
                    }
                })
        }
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

            <form encType="multipart/form-data" method="POST">
                <h1>SignUp</h1>

                <input
                    type="text"
                    onChange={(e) => {
                        setFName(e.target.value);
                    }}
                    value={fName}
                    placeholder="First Name"
                    required
                />

                <input
                    type="text"
                    onChange={(e) => {
                        setLName(e.target.value);
                    }}
                    value={lName}
                    placeholder="Last Name"
                    required
                />

                <input
                    type="email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    value={email}
                    placeholder="E-mail Address"
                    required
                />
                <input
                    type="password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    value={password}
                    placeholder="Password"
                    required
                />

                <input
                    type="password"
                    onChange={(e) => {
                        setCPassword(e.target.value);
                    }}
                    value={cPassword}
                    placeholder="Confirm Password"
                    required
                />
                <label style={{ "color": "orange", "width": "80%", "textAlign": "left", "marginBottom": "0" }} >Upload your profile image</label>
                <input name="image" id="file-input" type="file" accept="image/*" onChange={handleFileChange} />
                <button onClick={handleClick} style={{ "width": "50%" }}>{registerButton}</button>
                <Link to="/login">
                    <button style={{ "width": "100%" }}>Login</button>
                </Link>
            </form>

        </div>
    );
}