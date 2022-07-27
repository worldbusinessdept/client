import React from "react";
import Welcome from "./components/Welcome";
import WhatIs from "./components/WhatIs";
import Actions from "./components/Actions";

import FeaturedIn from "./components/FeaturedIn";
import Reviews from "./components/Reviews";
import Founder from "./components/Founder";
import Contact from "./components/Contact";
// eslint-disable-next-line
import Footer from "./components/Footer";

import Phone from "./components/Phone"
// eslint-disable-next-line
import TelegramFollow from "./components/TelegramFollow";
import PaymentSecure from "../Assets/PaymentSecured.jpeg"

import TelegramImage from "../Assets/TelegramImage.png"
export default function Home() {
    return (
        <div style={{ "width": "100%" }} >


            <Welcome />
            {/* <TelegramFollow/> */}
            <WhatIs />
            <Actions />

            <FeaturedIn />
            <Phone />
            <Reviews />
            <Founder />
            <Contact />
            {/* <Footer/> */}
            <a href="https://t.me/swiftbusinesspayteam" target="_blank" rel="noreferrer" >

                <img src={TelegramImage} alt="TelegramImage" style={{ "position": "fixed", "bottom": "0", "right": "0", "width": "80px", "margin": "0 15px 15px 0", }} />
            </a>

            <img src={PaymentSecure} alt="paymentSecure" style={{ "width": "100%" }} />

        </div>
    );
}