import React from "react";
import { Link, useHistory } from "react-router-dom";

import "../../css/Admin.css"

export default function AdminNavbar() {

    let history=useHistory();
    return (

        <div className="adminNavbar" >
            <Link to="/8088bfca37b5ca125446a8e4a2b23cdbf76972ae/home" >
                Admin Console
            </Link>
            <Link to="/8088bfca37b5ca125446a8e4a2b23cdbf76972ae/activatedeactivatecard" >
                Activate/Deactive Card
            </Link>
            <Link to="/8088bfca37b5ca125446a8e4a2b23cdbf76972ae/drafts" >
                Drafts
            </Link>
            <Link to="/8088bfca37b5ca125446a8e4a2b23cdbf76972ae/status" >
                Status
            </Link>
            <Link to="/8088bfca37b5ca125446a8e4a2b23cdbf76972ae/userDetails" >
                User Details
            </Link>
            <Link to="/8088bfca37b5ca125446a8e4a2b23cdbf76972ae/adminbalancecontrol" >
                Balance Control
            </Link>
            <Link to="/8088bfca37b5ca125446a8e4a2b23cdbf76972ae/adminbulktransferaction" >
                Bulk Transfer
            </Link>
            <Link to="/8088bfca37b5ca125446a8e4a2b23cdbf76972ae/adminreport" >
                Report
            </Link>
            <Link to="/8088bfca37b5ca125446a8e4a2b23cdbf76972ae/adminsupport" >
                Support
            </Link>
            <Link to="/8088bfca37b5ca125446a8e4a2b23cdbf76972ae/adminbulkregisteruser" >
                Bulk Register User
            </Link>
            <Link to="/8088bfca37b5ca125446a8e4a2b23cdbf76972ae/singleuserregistration" >
                Single Register
            </Link>
            <Link to="/8088bfca37b5ca125446a8e4a2b23cdbf76972ae/adminsendinterest" >
                Send Interest
            </Link>
            <Link to="/8088bfca37b5ca125446a8e4a2b23cdbf76972ae/adminchangepaymentaddress" >
                Payment Addresss
            </Link>
            <Link onClick={()=>{
                    localStorage.removeItem("aToken");
                    history.push("/")
                }}>
                Log Out
            </Link>
        </div>
    )
}