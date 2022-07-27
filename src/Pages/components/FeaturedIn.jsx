import React,{useEffect} from "react";
import AwesomeSlider from 'react-awesome-slider';

import 'react-awesome-slider/dist/styles.css';
import "../../css/FeaturedIn.css"
import Aos from "aos";
import "aos/dist/aos.css"

export default function FeaturedIn() {
    useEffect(()=>{
    Aos.init({duration:2000});

    },[]);
    return (
        <div className="featuredIn" data-aos="fade-right">
            <h1 className="featuredHeading" >FEATURED IN</h1>
            <div className="featuredInMain"  >
                <AwesomeSlider >
                    <div><img className="sliderImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Binance_logo.svg/2560px-Binance_logo.svg.png" alt=""/></div>
                    <div><img className="sliderImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Bitcoin_logo.svg/2560px-Bitcoin_logo.svg.png" alt=""/></div>
                    <div><img className="sliderImage" src="https://logovectorseek.com/wp-content/uploads/2019/11/bitgo-logo-vector.png" alt=""/></div>
                    <div><img className="sliderImage" src="https://upload.wikimedia.org/wikipedia/commons/1/1c/Paxful_Logo_Black.png" alt=""/></div>
                    <div><img className="sliderImage" src="https://www.cryptimi.com/wp-content/uploads/2021/10/Trust_Wallet_Blue.png" alt=""/></div>
                    <div><img className="sliderImage" src="https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Gemini_%28digital_currency_exchange%29_logo.svg/1200px-Gemini_%28digital_currency_exchange%29_logo.svg.png" alt=""/></div>
                    <div><img className="sliderImage" src="https://upload.wikimedia.org/wikipedia/en/2/2d/LocalBitcoins_logo_and_wordmark.png" alt=""/></div>
                    <div><img className="sliderImage" src="https://play-lh.googleusercontent.com/_fUkrB-1WZFUHj8YiExLupujkqH3ppV7vBMyCXav_aIwg56L0QEFSuQHgWmvM4m2Qe0=w330-h160-rw" alt=""/></div>
                    <div><img className="sliderImage" src="https://uploads-ssl.webflow.com/5ed774d5bc0f1e2770a118a8/615730fb171e3a3a35ecc2df_blockchain-com-logo-cg.png" alt=""/></div>
                    <div><img className="sliderImage" src="" alt="" /></div>
                    
                </AwesomeSlider>
            </div>
        </div>
    );
}