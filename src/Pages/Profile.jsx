import React from "react";
import "../css/Profile.css"




export default function Profile() {
    // let cardName=JSON.parse(localStorage.getItem("data"));

    return(
        <div className="card-group">
        <div className="card">
            <div className="username">
            <h1>Name</h1>
            </div>
            <div className="balances">
            <h2>Balance :5000 USD</h2>
            <h2>Bitcoin left :7</h2> 
            <h2>Account No :XXXXXXXXX7890</h2> 
            </div>
            <div className="main">
            <div className="details">
            <table>
                <tr>
                <td>
                 <h3>Date</h3>
                 </td>
                 <td>
                     <h3>Amount</h3>

                 </td>
                 <td>
            <h3>Remarks</h3>

                 </td>
                 <td>
            <h3>Transaction Id</h3>

                 </td>
                </tr>
            
            </table>
               
             
            </div>
            <div className="detailsContent">

            </div>
            </div>
           
          
          <div className="logo"><img src="path/to/logo.png" alt="Visa"/></div>
          <div className="chip"><img src="path/to/chip.png" alt="chip"/></div>
      <div className="number"></div>
          <div className="name"></div>
          <div className="from"></div>
          <div className="to"></div>
        </div>
        <div className="circles">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        </div>
 
      </div>
    );

}