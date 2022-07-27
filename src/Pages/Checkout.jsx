import React from "react";
import "../css/Payment.css"

import "../css/Checkout.css"
export default function Checkout() {
    return (
        <div className="payment" >

            <h1>Checkout</h1>
            <br />
            <h3 style={{ "fontSize": "15px" }} >Have coupon?<a href="##" style={{ "color": "#DF2D07" }} > Click here to enter your code.</a></h3>
            
            <br/>
            <div className="billMain" >
                <div className="billingDetails" >
                    <h2>Billing Details</h2>
                    <form>
                        <input
                            type="text"
                            onChange={(e) => {

                            }}

                            placeholder="First Name*"
                        />
                        <input
                            type="text"
                            onChange={(e) => {

                            }}

                            placeholder="Last Name*"
                        />
                        <input
                            type="text"
                            onChange={(e) => {

                            }}

                            placeholder="Company Name (optional)"
                        />
                        <input
                            type="text"
                            onChange={(e) => {

                            }}

                            placeholder="Country / Region"
                        />
                        <input
                            type="text"
                            onChange={(e) => {

                            }}

                            placeholder="Street Address*"
                        />
                        <input
                            type="text"
                            onChange={(e) => {

                            }}

                            placeholder="Town / City *"
                        />
                        <input
                            type="text"
                            onChange={(e) => {

                            }}

                            placeholder="State *"
                        />
                        <input
                            type="text"
                            onChange={(e) => {

                            }}

                            placeholder="Zip Code*"
                        />
                        <input
                            type="text"
                            onChange={(e) => {

                            }}

                            placeholder="Phone*"
                        />
                        <input
                            type="text"
                            onChange={(e) => {

                            }}

                            placeholder="Email address*"
                        />
                        <h3>Additional Information</h3>
                        <input
                            type="text"
                            onChange={(e) => {

                            }}

                            placeholder="Order notes (optional)"
                        />
                        
                        <button>Complete Payment</button>

                    </form>
                </div>
                <div className="checkoutBox">
                    <div className="checkout" >
                        <h2><p>Product:</p> Subtotal</h2>
                        <h2><p>Wallet Topup x 1:</p> $50.00</h2>
                        <h2><p>Subtotal:</p> $50.00</h2>
                        <h2><p>Total:</p> $50.00</h2>
                       
                     
                        <p>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="##" style={{"color":"#DF2D07"}} >privacy policy</a>.</p>
                        <button>Place Order</button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}