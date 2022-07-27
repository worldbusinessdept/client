import React from "react";
import "../../css/Payment.css"

export default function DebitCardDetails() {
    return (
        <div className="payment" >

            <h2>Debit Card Details</h2>
            <form>
                <input
                    type="text"
                    placeholder="CARD NUMBER*"
                />
                <div className="debitCardDetails">
                    <input
                        type="text"
                        placeholder="Expiry Month"
                    />
                    <input
                        type="text"
                        placeholder="Expiry Year"
                    />
                    <input
                        type="text"
                        placeholder="CVV"
                    />
                </div>
                <input
                    type="text"
                    placeholder="Card Holder's Name"
                />
                <div style={{"display":"flex", "justifyContent":"left"}} >
                    <label htmlFor="remember" >Remember Me</label>
                    <input
                        type="checkbox"
                        id="remember"

                    />
                </div>
                <button>Complete Payment</button>
            </form>
        </div>
    );
}