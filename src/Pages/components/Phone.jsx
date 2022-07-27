import React, { useEffect } from "react";
import "../../css/Phone.css"
import Vid from "../../Assets/image01.png"
import TrustpilotStar from "../../Assets/TrustpilotStars.svg"
import IosDownload from "../../Assets/IosDownload.png"
import GoogleDownload from "../../Assets/GoogleDownload.png"

import WindowsDownload from "../../Assets/WindowsDownload.png"

import Aos from "aos";
import "aos/dist/aos.css"




export default function Phone() {
    useEffect(() => {
        Aos.init({ duration: 2000 });

    }, []);

    return (
        <div className="phone" style={{ "width": "100%" }} >
            <div data-aos="flip-right" className="phoneVideo" >
                <img src={Vid} alt="Video" id='phoneImage' />
            </div>
            <div className="rating" >
                <img className="stars" src={TrustpilotStar} data-aos="zoom-in" alt="Stars" />
                <h1 className="stars" style={{ "color": "white" }}>Excelent score: 4.5</h1>

            </div>
            <div className="download" data-aos="zoom-in">
                <br />
                <img src={IosDownload} alt="apple" />
                <img src={GoogleDownload} alt="android" />
                <img src={WindowsDownload} alt="windows" />
                <br />
            </div>
        </div>
    )

}