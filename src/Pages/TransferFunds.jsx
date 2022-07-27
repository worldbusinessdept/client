import React from "react";
import "../css/transfer.css"

export default function TransferFunds(){
    return(
        <div className="card-div">
        <div className="cardss">
            <div className="border">
            <h2>
           BALANCE
        </h2>
        <h4>
            name
        </h4>
          <h3>
              $
              <span>
                  9231
              </span>
          </h3>
        <h3>
           ₿ 
            <span className="btc">
              0.8
            </span>
        </h3>
        <h3 >
            <span className="btc">
                A/C No. :
            </span>
            1234567890
        </h3>
            </div>
    
        </div>

        <div className="form">
      <div className="title">Transfer Funds</div>
      <div className="subtitle"></div>
      <div className="input-container ic1">
        <input id="firstname" className="input" type="text" placeholder=" " />
        <div className="cut"></div>
        <label for="firstname" className="placeholder">Recipient(Email or Account Number)</label>
      </div>
      <div className="input-container ic2">
        <input id="lastname" className="input" type="text" placeholder=" " />
        <div className="cut"></div>
        <label for="lastname" className="placeholder">Amount</label>
      </div>
      <div className="input-container ic2">
        <input id="email" className="input" type="text" placeholder=" " />
        <div className="cut cut-short"></div>
        <label for="email" className="placeholder">Purpose of Transfer</label>
      </div>
      <button type="text" className="submit">Confirm Transfer</button>
    </div>
        </div>
       
    );
}