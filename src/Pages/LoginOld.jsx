import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import "../css/Payment.css"
import ParticleAnimation from "./components/ParticleAnimation";

export default function Login() {
    let history=useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        const login = {
            "email": username,
            "password": password
        };
        // console.log(login);
        await axios.post("http://localhost:5000/login", login)
            .then(async (response) => {
                // console.log(response.data)
                await localStorage.setItem("token", response.data.token);
                await localStorage.setItem("data", JSON.stringify(response.data.user));
                await localStorage.setItem("card", JSON.stringify(response.data.card));
                if (response.status === 200) {
                    // swal("Logged In", "Successfully Authorised", "success");
                    history.push("/user/dashboard");
                    window.location.reload();
                }else if(response.status === 401){
                    swal("Invalid credentials!", "Please try again with correct credentials.", "error");
                    // console.log(response.data)
                }else{
                    swal("Error!", "Some unexpected error occurred.", "error")
                    // console.log(response.data)
                }
            });
    }

    return (
        <div className="payment">
            <ParticleAnimation/>
            <div className="formOuter">

                <form className="createUserForm">
                <h1>Login</h1>
                    <input
                        type="text"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        value={username}
                        placeholder="E-mail"
                    />
                    <input
                        type="text"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        value={password}
                        placeholder="Password"
                    />

                    <button type="submit" onClick={handleSubmit} style={{"width":"50%"}} >Login</button>
                    <Link to="/signup">
                        <button style={{"width":"100%"}} >Signup</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}