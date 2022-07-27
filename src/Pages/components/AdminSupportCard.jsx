import React, { useState } from "react";
import axios from "axios";

import "../../css/AdminActivatesAllCards.css"
import swal from "sweetalert"
import CircularProgress from '@mui/material/CircularProgress';

export default function AdminSupportCard(props) {


    let [supportButton, setSupportButton]=useState('Action Taken');
    function handleActionTaken(e) {

        e.preventDefault();
        setSupportButton(<CircularProgress color="inherit" />)
        axios.post(`${process.env.REACT_APP_SERVER}/adminsupportactiontaken`,
            {
                _id: props.id
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                }
            }
        ).then((response) => {
            setSupportButton('Action Taken')

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

            <div>Email: <p>{props.email}</p></div>
            <div>Subject: <p>{props.subject}</p></div>
            <div>Description: <p>{props.description}</p></div>
            <div>Action: <p>{props.actionTaken === true ? "Taken" : "Pending"}</p></div>
            <div>Attachment: <a href={props.attachment} target="_blank" rel="noreferrer">View Attachment</a></div>
            {props.actionTaken === true
                ? null
                :
                <button onClick={handleActionTaken} >{supportButton}</button>
            }



        </div>
    )
}