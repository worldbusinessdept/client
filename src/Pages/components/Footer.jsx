import React from "react"
import "../../css/Footer.css"

export default function Footer() {
    return (

        <footer>
            <div class="content">
                <div class="left box">
                    <div class="upper">
                        <div class="topic">About us</div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    <div class="lower">
                        <div class="topic">Contact us</div>
                        <div class="phone">
                            <a href="##"><i class="fas fa-phone-volume"></i>0123456789</a>
                        </div>
                        <div class="email">
                            <a href="##"><i class="fas fa-envelope"></i>abc@gmail.com</a>
                        </div>
                    </div>
                </div>
                <div class="middle box">
                    <div class="topic">Our Services</div>
                    <div><a href="##">Enter services</a></div>
                    <div><a href="##">Enter services</a></div>
                    <div><a href="##">Enter services</a></div>
                    <div><a href="##">Enter services</a></div>
                    <div><a href="##">Enter services</a></div>
                    <div><a href="##">Enter services</a></div>
                </div>
                <div class="right box">
                    <div class="topic">Subscribe us</div>
                    <form action="#">
                        <input type="text" placeholder="Enter email address" />
                            <input type="submit" name="" value="Send"/>
                                <div class="media-icons">
                                    <a href="##"><i class="fab fa-facebook-f"></i></a>
                                    <a href="##"><i class="fab fa-instagram"></i></a>
                                    <a href="##"><i class="fab fa-twitter"></i></a>
                                    <a href="##"><i class="fab fa-youtube"></i></a>
                                    <a href="##"><i class="fab fa-linkedin-in"></i></a>
                                </div>
                            </form>
                        </div>
                </div>
                <div class="bottom">
                    <p>Copyright © 2021 <a href="##">Company</a> All rights reserved</p>
                    
                </div>
        </footer>



    )
}