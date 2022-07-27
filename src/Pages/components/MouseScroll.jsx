import React from "react";
import "../../css/MouseScroll.css"

export default function MouseScroll() {
    return (
        <div class="mouse_scroll"  >
            <a href="#whatIs">
                <div class="mouse">
                    <div class="wheel"></div>
                </div>
                <div>
                    <span class="m_scroll_arrows unu"></span>
                    <span class="m_scroll_arrows doi"></span>
                    <span class="m_scroll_arrows trei"></span>
                </div>
            </a>
        </div>
    )
}