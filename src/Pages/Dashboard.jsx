import React, { useEffect, useState } from "react";
import "../css/UserAccount.css";

import ParticleAnimation from "./components/ParticleAnimation";
import axios from "axios"
import DefaultImage from "../Assets/CardUi.png"

import { useHistory } from "react-router-dom"
import Prime from "../Assets/Cards/PrimeMasterCard.png"
import Classic from "../Assets/Cards/ClassicMasterCard.png"


export default function UserAccount() {

    let history = useHistory()
    let localData = JSON.parse(localStorage.getItem("data"));
    let [data, setData] = useState(localData);
    let [cardStatus, setCardStatus] = useState("Inactive");

    let [balance, setBalance] = useState(0);
    let [cardImage, setCardImage] = useState(DefaultImage)

    let [cardNumber, setCardNumber] = useState("XXXXXXXXXXXXXXXX")
    let [expiryYear, setExpiryYear] = useState("XX")
    let [expiryMonth, setExpiryMonth] = useState("XX")
    let [cvv, setCvv] = useState("XXX")

    let [perctAdd, setPerctAdd] = useState(0);
    let splittedCardNumber = cardNumber.match(/.{1,4}/g);
    let [bitcoinData, setBitcoinData] = useState();
    let [oneBtc, setOneBtc] = useState(0)
    useEffect(() => {
        axios.get("https://bitpay.com/api/rates")
            .then(async (response) => {
                // console.log(response.data);
                response.data.forEach(element => {

                    if (element.code === "USD") {

                        setOneBtc(element.rate)

                    }
                });
                // console.log(balance);
                // console.log(oneBtc);
                // console.log(1/oneBtc);
                // console.log(balance*(1/oneBtc));
                await setBitcoinData(parseFloat(balance * (1 / oneBtc)).toFixed(6))
            }).then(() => {
                axios.get('https://api.pro.coinbase.com/products/BTC-USD/stats')
                    .then(async response => {

                        let perct = (response.data.last - response.data.open) / response.data.open * 100
                        console.log('Percentage', parseFloat(perct) * parseFloat(balance))
                        await setPerctAdd(parseFloat(perct) * parseFloat(balance))
                        await setBitcoinData(parseFloat((balance + parseInt(perctAdd)) * (1 / oneBtc)).toFixed(6))

                    })
            })
// eslint-disable-next-line
    }, [balance])

   

    // useEffect(() => {
    //     axios.get('https://api.pro.coinbase.com/products/BTC-USD/stats')
    //     .then(response=>{
    //         let perct=(response.data.last - response.data.open)/response.data.open*100
    //         console.log('Percentage', parseFloat(perct)*parseFloat(balance))
    //         setPerctAdd(parseFloat(perct)*parseFloat(balance))
    //     })
    // }, [balance])
    async function fetchData() {

        await axios.post(`${process.env.REACT_APP_SERVER}/getuser`, { userId: JSON.parse(localStorage.getItem("data")).userId },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(async (response) => {
                await setData(response.data);
                await setBalance(response.data.balance)
                // console.log(response.data)
                if (response.data.prime === "Approved") {
                    setCardStatus(response.data.prime)
                    response.data.primeData.cardNumber !== "" && setCardNumber(response.data.primeData.cardNumber)
                    response.data.primeData.expiryMonth !== "" && setExpiryMonth(response.data.primeData.expiryMonth)
                    response.data.primeData.expiryYear !== "" && setExpiryYear(response.data.primeData.expiryYear)
                    response.data.primeData.cvv !== "" && setCvv(response.data.primeData.cvv)
                    setCardImage(Prime)

                } else if (response.data.classic === "Approved") {
                    setCardStatus(response.data.classic)
                    response.data.classicData.cardNumber !== "" && setCardNumber(response.data.classicData.cardNumber)
                    response.data.classicData.expiryMonth !== "" && setExpiryMonth(response.data.classicData.expiryMonth)
                    response.data.classicData.expiryYear !== "" && setExpiryYear(response.data.classicData.expiryYear)
                    response.data.classicData.cvv !== "" && setCvv(response.data.classicData.cvv)
                    setCardImage(Classic)
                } else if (response.data.prime === "Pending" && response.data.classic !== "Pending") {
                    setCardImage(Prime)
                    response.data.primeData.cardNumber !== "" && setCardNumber(response.data.primeData.cardNumber)
                    response.data.primeData.expiryMonth !== "" && setExpiryMonth(response.data.primeData.expiryMonth)
                    response.data.primeData.expiryYear !== "" && setExpiryYear(response.data.primeData.expiryYear)
                    response.data.primeData.cvv !== "" && setCvv(response.data.primeData.cvv)
                    setCardStatus("Pending");
                } else if (response.data.classic === "Pending" && response.data.prime !== "Pending") {

                    setCardImage(Classic);
                    response.data.classicData.cardNumber !== "" && setCardNumber(response.data.classicData.cardNumber)
                    response.data.classicData.expiryMonth !== "" && setExpiryMonth(response.data.classicData.expiryMonth)
                    response.data.classicData.expiryYear !== "" && setExpiryYear(response.data.classicData.expiryYear)
                    response.data.classicData.cvv !== "" && setCvv(response.data.classicData.cvv)
                    setCardStatus("Pending")
                } else {

                    setCardStatus("Inactive");
                    setCardNumber("XXXXXXXXXXXXXXXX")
                    setExpiryMonth("XX")
                    setExpiryYear("XX")
                    setCvv("XXX")
                    setCardImage(DefaultImage)
                }
            })
    }

    useEffect(() => {
        fetchData();

        //Setting status color here
        if (cardStatus === "Approved") {
            document.getElementById("cardStatus").style.color = "Green"
        } else if (cardStatus === "Pending") {
            document.getElementById("cardStatus").style.color = "Yellow"
        } else if (cardStatus === "Inactive") {

            document.getElementById("cardStatus").style.color = "Red"
        }


        //Setting card image here

    }, [cardStatus]);

    return (
        <div>
            {data === undefined
                ? <div>
                    Loading....
                </div>
                : <div className="card-div">
                    <ParticleAnimation />
                    <div className="cards">
                        <div className="border">
                            <h2>BALANCE</h2>
                            <h4>{data.fName}</h4>
                            <h3>
                                $<span>{parseInt(balance) + parseInt(perctAdd)}</span>
                            </h3>
                            <h3>
                                ₿<span className="btc">{bitcoinData}</span>
                            </h3>
                            <h3>
                                <span>A/C No. :</span>
                                {data.accountNumber}
                            </h3>
                        </div>
                    </div>
                    <div className="rot-card">
                        <div className="rot-anim">
                            <div className="front" style={{ "backgroundImage": `url(${cardImage})` }} >
                                <div className="cardDataDiv" >
                                    <div className="cardStatus" >
                                        <h2 id="cardStatus">
                                            {cardStatus}
                                        </h2>
                                    </div>
                                    <div className="cardNumber" >
                                        <h1>{splittedCardNumber.join(' ')}</h1>
                                    </div>
                                    <div className="cardHolderName" >
                                        <div>
                                            <h3>{data.fName + ` ` + data.lName}</h3>
                                        </div>
                                        <div className="cardExpiry" >
                                            <h3>{expiryMonth}/{expiryYear}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="back">
                                <div className="black-back"></div>
                                <div className="white-back">
                                    <div className="green-back"></div>
                                    <h3 className="cvv">{cvv}</h3>
                                    <div className="green-back"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="totalButton">
                        <div className="button" onClick={() => { history.push("/user/fundtransfer") }} style={{ "cursor": "pointer" }} >
                            <a className="transfer" href="##">Fund Transfer</a>
                        </div>
                        <div className="button" onClick={() => { history.push("/user/transaction") }} style={{ "cursor": "pointer" }} >
                            <a className="transfer" href="##" >Transaction History</a>
                        </div>
                    </div>
                </div>
            }


        </div>
    );
}
