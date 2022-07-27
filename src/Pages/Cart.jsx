import React from "react";
import "../css/Cart.css"

import "../css/Payment.css"

export default function Cart() {
    return (
        <div className="cart, payment" >

            <h1>CART</h1>
            <br/>
            <div className="top" >
                <div className="subt" >
                    <table>
                        <tr className="heads" >
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                        <tr>
                            <td>Wallet Topup</td>
                            <td>$50.00</td>
                            <td>1</td>
                            <td>$50.00</td>
                        </tr>
                        <tr>
                            <td>Wallet Topup</td>
                            <td>$50.00</td>
                            <td>1</td>
                            <td>$50.00</td>
                        </tr>
                        
                    </table>

                </div>
                <div className="coupon" >
                    <div className="couponDiv" >
                        <form>
                            <input 
                                type="text" 
                                placeholder="Coupon Code"
                            />
                            <button>Apply Coupon</button>
                        </form>
                    </div>
                </div>
                <br/>
                <div className="cartTotal" >
                    <h2>Total: $50.00</h2>
                    <button>Checkout</button>
                </div>
            </div>
            <div className="checkout" >

            </div>
        </div>
    );
}