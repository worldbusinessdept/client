import React from "react";
import "../../css/Payment.css"

import AdminNavbar from "./AdminNavbar";
import AdminCardDataTable from "../components/AdminCardDataTable";


export default function AdminStatus(){
    return(
        
        <div className="payment" >

            <h2>Admin Status</h2>
            <AdminNavbar/>
            <br/>
            <AdminCardDataTable/>
        </div>
        
    )
}