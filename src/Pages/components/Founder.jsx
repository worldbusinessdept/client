import React from "react";
import "../../css/Founder.css"

import FounderImage from "../../Assets/Founder.jpg"
export default function Founder(){
    return(
        <div className="founder" >

            <div className="founderName" >
                <h1>Advika Binita</h1>
                <h3>FOUNDER</h3>
            </div>
            <div className="founderImage" >
                <img src={FounderImage} alt="founder"/>
            </div>
        </div>
    );
}