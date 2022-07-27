import React, { useState } from "react";
import "../css/Payment.css"

export default function Payment() {

    let [name, setName]=useState();
    let [acNumber, setAcNumber]=useState();
    let [bankName, setBankName]=useState();
    let [swiftcode, setSwiftcode]=useState();
    let [amount, setAmount]=useState();


    function handleClick(e){
        e.preventDefault();
    }

    return (
        <div className="payment" >

            <h1>Bank Account Payment</h1>

            <form>
                <input 
                    type="text" 
                    onChange={(e)=>{
                        setName(e.target.value);
                    }}
                    value={name}
                    placeholder="Acount Holder Name*"
                />
                <input 
                    type="text" 
                    onChange={(e)=>{
                        setAcNumber(e.target.value)
                    }}
                    value={acNumber}
                    placeholder="Acount Number*"
                />
                <input 
                    type="text" 
                    onChange={(e)=>{
                        setBankName(e.target.value);
                    }}
                    value={bankName}
                    placeholder="Bank Name*"
                />
                <input 
                    type="text" 
                    onChange={(e)=>{
                        setSwiftcode(e.target.value);
                    }}
                    value={swiftcode}
                    placeholder="Swift Code*"
                />
                <input 
                    type="text" 
                    onChange={(e)=>{
                        setAmount(e.target.value)
                    }}
                    value={amount}
                    placeholder="Amount*"
                />
                <button onClick={handleClick} >Complete Payment</button>
                
            </form>
        </div>
    );
}