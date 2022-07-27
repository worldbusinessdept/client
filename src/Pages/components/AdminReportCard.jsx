import React, { useState } from "react";
import axios from "axios";

import "../../css/AdminActivatesAllCards.css"
import swal from "sweetalert"
import CircularProgress from '@mui/material/CircularProgress';

export default function AdminReportCard(props) {


    let [reportButton, setReportButton]=useState('Action Taken');
    function handleActionTaken(e) {

        e.preventDefault();
        setReportButton(<CircularProgress color="inherit" />)
        axios.post(`${process.env.REACT_APP_SERVER}/adminrequestactiontaken`,
            {
                _id: props.id
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                }
            }
        ).then((response) => {
            setReportButton('Action Taken');
            if (response.status === 200) {
                swal(`${response.data.message}`, "", "success");
                props.clickFunction();
            } else {
                swal("Error!", "", "error")
                props.clickfunction();
            }
        })
    }




    return (
        <div style={{ "border": "2px solid orange", "padding": "4px", "marginBottom": "11px" }} className="adminActivatesAllCards" >

            <div>Reported By: <p>{props.reportedBy}</p></div>
            <div>Reported Account: <p>{props.reportedAccount}</p></div>
            <div>Reason: <p>{props.reportReason}</p></div>
            <div>Action: <p>{props.actionTaken === true ? "Taken" : "Pending"}</p></div>
            <div>Attachment: <a href={props.attachment} target="_blank" rel="noreferrer">View Attachment</a></div>
            {props.actionTaken === true
                ? null
                :
                <button onClick={handleActionTaken} >{reportButton}</button>
            }



        </div>
    )
}