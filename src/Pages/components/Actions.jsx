import React from "react";
import "../../css/Actions.css"

import Order from "../../Assets/Order.gif"
import Pay from "../../Assets/Pay.gif"
import USD from "../../Assets/USD.gif"

export default function Actions(){
    return(
        <div className="actions" >

            <div className="actionCard" >
                <img src={Order} alt="Order"/>
                <h1>PLACE AN ORDER</h1>
                <h3>You’ll be auto-matched with a seller instantly</h3>
            </div>
            <div className="actionCard" >
                <img src={Pay} alt="pay" />
                <h1>PAY DIRECTLY TO SELLER</h1>
                <h3>You’ll be auto-matched with a seller instantly</h3>
            </div>
            <div className="actionCard" >
                <img src={USD} alt="USD" />
                <h1>RELEASES THE USD</h1>
                <h3>You’ll be auto-matched with a seller instantly</h3>
            </div>
        </div>
    );
}