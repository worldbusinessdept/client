import React, { useEffect, useState } from "react";
import "../css/Payment.css"

import "../css/Checkout.css"
// import axios from "axios";
import ParticleAnimation from "./components/ParticleAnimation"

import { CountryDropdown } from 'react-country-region-selector';
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import CircularProgress from '@mui/material/CircularProgress';
export default function Account() {
    let data = JSON.parse(localStorage.getItem("data"));

    let history = useHistory();

    let [password, setPassword] = useState("");
    let [email, setEmail] = useState(data.email);
    let [phone, setPhone] = useState(data.mobile);
    let [postalCode, setPostalCode] = useState();
    let [city, setCity] = useState(data.city);
    let [country, setCountry] = useState(data.country);
    let [dob, setDob] = useState(data.dob)
    let [image, setImage] = useState(data.image)
    let [updateButton, setUpdateButton]=useState("Update Profile")

    // eslint-disable-next-line
    let [postImageBase64, setPostImageBase64] = useState();


    function fetchDataAndStore() {
        axios.post(`${process.env.REACT_APP_SERVER}/getuser`, { userId: data.userId },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then((response) => {
                localStorage.setItem("data", JSON.stringify(response.data));
            })
    }

    useEffect(() => {
        fetchDataAndStore();
        // eslint-disable-next-line
    }, [])
    function handleClick(e) {
        e.preventDefault();
        setUpdateButton(<CircularProgress color="inherit" />);

        //Createing new form data
        const dataForm = new FormData();

        //Apending the image to image json "image is name for the image input" json that is sent is {image: "theImage"}
        dataForm.append('userId', data.userId);
        dataForm.append('password', password);
        dataForm.append('email', email);
        dataForm.append('phone', phone);
        dataForm.append('postalCode', postalCode);
        dataForm.append('city', city);
        dataForm.append('country', country);
        dataForm.append('dob', dob);
        dataForm.append('image', image);



        axios.post(`${process.env.REACT_APP_SERVER}/updateaccount`, dataForm,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
            .then((response) => {

                fetchDataAndStore();
                setUpdateButton("Update Profile")
                if (response.status === 200) {
                    localStorage.setItem("data", JSON.stringify(response.data.data))
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
            <div className="backButton" >
                <i class="fas fa-chevron-circle-left" onClick={() => history.goBack()} />
            </div>
            <h1>Account Settings</h1>
            <ParticleAnimation />
            <form encType="multipart/form-data" method="POST">
                <img src={image !== "" ? image : "https://cahsi.utep.edu/wp-content/uploads/kisspng-computer-icons-user-clip-art-user-5abf13db5624e4.1771742215224718993529.png"} alt="UserImage" />
                <label style={{ "color": "orange", "width": "80%", "textAlign": "left", "marginBottom": "0" }} >First Name</label>
                <input
                    type="text"
                    placeholder="First Name"
                    value={data.fName}
                />
                <label style={{ "color": "orange", "width": "80%", "textAlign": "left", "marginBottom": "0" }} >Last Name</label>
                <input
                    type="text"
                    placeholder="Last Name"
                    value={data.lName}
                />
                <label style={{ "color": "orange", "width": "80%", "textAlign": "left", "marginBottom": "0" }} >Account Number</label>
                <input
                    type="text"
                    placeholder="User ID"
                    value={data.accountNumber}
                />
                <label style={{ "color": "orange", "width": "80%", "textAlign": "left", "marginBottom": "0" }} >Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                <label style={{ "color": "orange", "width": "80%", "textAlign": "left", "marginBottom": "0" }} >Email</label>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
                <label style={{ "color": "orange", "width": "80%", "textAlign": "left", "marginBottom": "0" }} >Phone Number</label>
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => {
                        setPhone(e.target.value)
                    }}
                />
                <label style={{ "color": "orange", "width": "80%", "textAlign": "left", "marginBottom": "0" }} >Postal Code</label>
                <input
                    type="text"
                    placeholder="Postal Code"
                    value={postalCode}
                    onChange={(e) => {
                        setPostalCode(e.target.value)
                    }}
                />
                <label style={{ "color": "orange", "width": "80%", "textAlign": "left", "marginBottom": "0" }} >City</label>
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => {
                        setCity(e.target.value)
                    }}
                />
                <label style={{ "color": "orange", "width": "80%", "textAlign": "left", "marginBottom": "0" }} >Country</label>
                <CountryDropdown
                    value={country}
                    onChange={(val) => setCountry(val)} />

                <label style={{ "color": "orange", "width": "80%", "textAlign": "left", "marginBottom": "0" }} >Date of Birth</label>
                <input
                    type="date"
                    style={{ "width": "fitContent" }}
                    onChange={(e) => { setDob(e.target.value) }}
                />
                <label style={{ "color": "orange", "width": "80%", "textAlign": "left", "marginBottom": "0" }} >Update Image</label>
                <input name="image" id="file-input" type="file" accept="image/*" onChange={handleFileChange} />
                <button onClick={handleClick} >{updateButton}</button>
            </form>

        </div>
    );
}