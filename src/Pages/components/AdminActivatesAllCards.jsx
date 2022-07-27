import React, { useState } from "react";
import axios from "axios";

import "../../css/AdminActivatesAllCards.css"
import swal from "sweetalert"
import CircularProgress from '@mui/material/CircularProgress';

export default function AdminActivatesAllCards(props) {

    let [primeNumber, setPrimeNumber] = useState(props.primeData.cardNumber);
    let [primeMonth, setPrimeMonth] = useState(props.primeData.expiryMonth);
    let [primeYear, setPrimeYear] = useState(props.primeData.expiryYear);
    let [primeCvv, setPrimeCvv] = useState(props.primeData.cvv);

    let [classicNumber, setClassicNumber] = useState(props.classicData.cardNumber);
    let [classicMonth, setClassicMonth] = useState(props.classicData.expiryMonth);
    let [classicYear, setClassicYear] = useState(props.classicData.expiryYear);
    let [classicCvv, setClassicCvv] = useState(props.classicData.cvv);



    let [primeUpdateButton, setPrimeUpdateButton] = useState("Update");
    let [primeActivateButton, setPrimeActivateButton] = useState("Activate");
    let [primeAwaitButton, setPrimeAwaitButton] = useState("Await");
    let [primeDeactivateButton, setPrimeDeactivateButton] = useState("Deactivate");

    let [classicUpdateButton, setClassicUpdateButton] = useState("Update");
    let [classicActivateButton, setClassicActivateButton] = useState("Activate");
    let [classicAwaitButton, setClassicAwaitButton] = useState("Await");
    let [classicDeactivateButton, setClassicDeactivateButton] = useState("Deactivate");

    let primeData = {
        userId: props.userId,
        cardName: "prime",
        cardNumber: primeNumber,
        expiryMonth: primeMonth,
        expiryYear: primeYear,
        cvv: primeCvv
    }
    let classicData = {
        userId: props.userId,
        cardName: "classic",
        cardNumber: classicNumber,
        expiryMonth: classicMonth,
        expiryYear: classicYear,
        cvv: classicCvv
    }
    function handlePrimeCardUpdate(e) {
        e.preventDefault();

        setPrimeUpdateButton(<CircularProgress color="inherit" />);
        axios.post(`${process.env.REACT_APP_SERVER}/updatecarddata`, primeData,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                }
            })
            .then((response) => {
                setPrimeUpdateButton("Update")
                if (response.status === 200) {
                    swal(`${response.data.message}`, "", "success")
                } else if (response.status === 202) {
                    swal(`${response.data.message}`, "", "error")
                }
            })
    }
    function handleClassicCardUpdate(e) {
        e.preventDefault();
        setClassicUpdateButton(<CircularProgress color="inherit" />);
        axios.post(`${process.env.REACT_APP_SERVER}/updatecarddata`, classicData,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                }
            })
            .then((response) => {

                setClassicUpdateButton("Update")
                if (response.status === 200) {
                    swal(`${response.data.message}`, "", "success")
                } else if (response.status === 202) {
                    swal(`${response.data.message}`, "", "error")
                }
            })
    }


    return (
        <div style={{ "border": "2px solid orange", "padding": "4px", "marginBottom": "11px" }} className="adminActivatesAllCards" >

            <div>First Name: <p>{props.fName}</p></div>
            <div>Last Name: <p>{props.lName}</p></div>
            <div>Email: <p>{props.email}</p></div>
            <div>Image: <a href={props.image} target="_blank" rel="noreferrer">View image</a></div>
            <div>ID: <a href={props.Id} target="_blank" rel="noreferrer">View ID</a></div>
            <br />
            <div className="actionButton">
                <div>Update Prime Master Card</div>
                <input
                    placeholder="Card Number "
                    value={primeNumber}
                    onChange={(e) => setPrimeNumber(e.target.value)}
                />
                <input
                    placeholder="Expiry Month"
                    value={primeMonth}
                    onChange={(e) => setPrimeMonth(e.target.value)}
                />
                <input
                    placeholder="Expiry Year"
                    value={primeYear}
                    onChange={(e) => setPrimeYear(e.target.value)}
                />
                <input
                    placeholder="CVV"
                    value={primeCvv}
                    onChange={(e) => setPrimeCvv(e.target.value)}
                />
                <button onClick={handlePrimeCardUpdate} >{primeUpdateButton}</button>
            </div>
            <div className="actionButton">
                <div>Update Classic Master Card</div>
                <input
                    placeholder="Card Number "
                    value={classicNumber}
                    onChange={(e) => setClassicNumber(e.target.value)}
                />
                <input
                    placeholder="Expiry Month"
                    value={classicMonth}
                    onChange={(e) => setClassicMonth(e.target.value)}
                />
                <input
                    placeholder="Expiry Year"
                    value={classicYear}
                    onChange={(e) => setClassicYear(e.target.value)}
                />
                <input
                    placeholder="CVV"
                    value={classicCvv}
                    onChange={(e) => setClassicCvv(e.target.value)}
                />
                <button onClick={handleClassicCardUpdate} >{classicUpdateButton}</button>
            </div>

            <br />
            <div className="actionButton" >
                <div>Prime Master Card <p>(Status: {props.prime})</p></div>
                {(props.prime === "Pending" || props.prime === "Inactive")
                    ? <button onClick={async () => {
                        setPrimeActivateButton(<CircularProgress color="inherit" />);
                        setPrimeAwaitButton("Await");
                        setPrimeDeactivateButton("Deactivate");
                        setClassicActivateButton("Activate");
                        setClassicAwaitButton("Await");
                        setClassicDeactivateButton("Deactivate");
                        await axios.post(`${process.env.REACT_APP_SERVER}/adminactivatedeactivatecontrol`, { userId: props.userId, cardName: "prime", action: "activate" }, {
                            headers: {
                                "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                            }
                        })
                        await axios.post(`${process.env.REACT_APP_SERVER}/adminactivatedeactivatecontrol`, { userId: props.userId, cardName: "classic", action: "deactivate" },
                            {
                                headers: {
                                    "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                                }
                            })
                        await props.clickFunction();
                    }} >{primeActivateButton}</button>
                    : <button style={{ "color": "#DF2D07", "backgroundColor": "black" }} >Activated</button>
                }
                {(props.prime === "Approved" || props.prime === "Inactive")
                    ? <button onClick={async () => {
                        setPrimeActivateButton("Activate");
                        setPrimeAwaitButton(<CircularProgress color="inherit" />);
                        setPrimeDeactivateButton("Deactivate");
                        setClassicActivateButton("Activate");
                        setClassicAwaitButton("Await");
                        setClassicDeactivateButton("Deactivate");

                        await axios.post(`${process.env.REACT_APP_SERVER}/adminactivatedeactivatecontrol`, { userId: props.userId, cardName: "prime", action: "pending" },
                            {
                                headers: {
                                    "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                                }
                            })
                        await props.clickFunction();
                    }} >{primeAwaitButton}</button>
                    : <button style={{ "color": "#DF2D07", "backgroundColor": "black" }} >Pending</button>
                }
                {(props.prime === "Pending" || props.prime === "Approved")
                    ? <button onClick={async () => {
                        setPrimeActivateButton("Activate");
                        setPrimeAwaitButton("Await");
                        setPrimeDeactivateButton(<CircularProgress color="inherit" />);
                        setClassicActivateButton("Activate");
                        setClassicAwaitButton("Await");
                        setClassicDeactivateButton("Deactivate");

                        await axios.post(`${process.env.REACT_APP_SERVER}/adminactivatedeactivatecontrol`, { userId: props.userId, cardName: "prime", action: "deactivate" },
                            {
                                headers: {
                                    "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                                }
                            })
                        await props.clickFunction();
                    }} >{primeDeactivateButton}</button>
                    : <button style={{ "color": "#DF2D07", "backgroundColor": "black" }} >Deactivated</button>
                }
            </div>
            <div className="actionButton" >
                <div>Classic Master Card <p>(Status: {props.classic})</p></div>

                {(props.classic === "Pending" || props.classic === "Inactive")
                    ? <button onClick={async () => {
                        setPrimeActivateButton("Activate");
                        setPrimeAwaitButton("Await");
                        setPrimeDeactivateButton("Deactivate");
                        setClassicActivateButton(<CircularProgress color="inherit" />);
                        setClassicAwaitButton("Await");
                        setClassicDeactivateButton("Deactivate");

                        await axios.post(`${process.env.REACT_APP_SERVER}/adminactivatedeactivatecontrol`, { userId: props.userId, cardName: "classic", action: "activate" },
                            {
                                headers: {
                                    "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                                }
                            })
                        await axios.post(`${process.env.REACT_APP_SERVER}/adminactivatedeactivatecontrol`, { userId: props.userId, cardName: "prime", action: "deactivate" },
                            {
                                headers: {
                                    "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                                }
                            })
                        await props.clickFunction();

                    }} >{classicActivateButton}</button>
                    : <button style={{ "color": "#DF2D07", "backgroundColor": "black" }} >Activated</button>
                }
                {(props.classic === "Approved" || props.classic === "Inactive")
                    ? <button onClick={async () => {
                        setPrimeActivateButton("Activate");
                        setPrimeAwaitButton("Await");
                        setPrimeDeactivateButton("Deactivate");
                        setClassicActivateButton("Activate");
                        setClassicAwaitButton(<CircularProgress color="inherit" />);
                        setClassicDeactivateButton("Deactivate");

                        await axios.post(`${process.env.REACT_APP_SERVER}/adminactivatedeactivatecontrol`, { userId: props.userId, cardName: "classic", action: "pending" },
                            {
                                headers: {
                                    "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                                }
                            })
                        await props.clickFunction();
                    }} >{classicAwaitButton}</button>
                    : <button style={{ "color": "#DF2D07", "backgroundColor": "black" }} >Pending</button>
                }
                {(props.classic === "Pending" || props.classic === "Approved")
                    ? <button onClick={async () => {
                        setPrimeActivateButton("Activate");
                        setPrimeAwaitButton("Await");
                        setPrimeDeactivateButton("Deactivate");
                        setClassicActivateButton("Activate");
                        setClassicAwaitButton("Await");
                        setClassicDeactivateButton(<CircularProgress color="inherit" />);

                        await axios.post(`${process.env.REACT_APP_SERVER}/adminactivatedeactivatecontrol`, { userId: props.userId, cardName: "classic", action: "deactivate" },
                            {
                                headers: {
                                    "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                                }
                            })
                        await props.clickFunction();
                    }} >{classicDeactivateButton}</button>
                    : <button style={{ "color": "#DF2D07", "backgroundColor": "black" }} >Deactivated</button>
                }
            </div>
        </div>
    )
}