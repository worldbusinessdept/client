import React from "react";
import "../css/Payment.css"

import "../css/Wallet.css"

export default function Wallet() {
    return (
        <div className="payment" >

            <h1>Wallet</h1>
            <div className="walletMain" >
                <div className="myWallet" >
                    <h2>My Wallet</h2>
                    <div>
                        <i class="fas fa-plus-square"></i>
                        <p>Wallet Topup</p>
                    </div>
                    <div>
                        <i class="fas fa-random"></i>
                        <p>Wallet Transfer</p>
                    </div>
                    <div>
                        <i class="fas fa-list-alt"></i>
                        <p>Transfer</p>
                    </div>
                </div>
                <div className="balance" >
                    <h2 style={{"display":"flex", "justifyContent":"space-between", "fontWeight":"400"}} >
                        <p>Balance</p>
                        <p>$0.00</p>
                    </h2>
                    <p style={{"color":"#DF2D07", "margin":"10px", "fontSize":"13px"}} >No transactions</p>
                </div>
            </div>
        </div>
    );
}