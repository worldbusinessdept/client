import React from "react";
import LoggedInNavbar from "./LoggedInNavbar";

import LoggedOutNavBar from "./LoggedOutNavBar";

export default function CurrentNavbar() {

    return (
        <>
            {localStorage.getItem("token") ? <LoggedInNavbar /> : <LoggedOutNavBar />}
        </>
    );
}