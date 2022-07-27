import React, { useEffect, useState } from "react";
import "../../css/Payment.css"

import "../../css/Admin.css"
import axios from "axios"
import AdminNavbar from "./AdminNavbar";

import AdminApproveCard from "../components/AdminApproveCard";
export default function AdminHome() {

    let [request, setRequest] = useState([]);

    async function fetchRequest() {
        await axios.get(`${process.env.REACT_APP_SERVER}/admingetallaccountrequest`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                }
            })
            .then(async (response) => {
                let temp = [];
                response.data.forEach(element => {
                    temp.push(element)
                });
                setRequest(temp);
            })
    }

    useEffect(() => {
        fetchRequest();
    }, []);
    return (

        <div className="payment" >
            {request === undefined
                ? <div>Loading....</div>
                : <div>
                    <h2>Admin console</h2>
                    <AdminNavbar />
                    <br />
                    <h3>Pending Requests</h3>

                    <div>
                        {   // eslint-disable-next-line
                            request.map((element) => {
                                if (element.approvalStatus === "Pending") {
                                    return (
                                        <AdminApproveCard
                                            userId={element.userId}
                                            fName={element.fName}
                                            lName={element.lName}
                                            email={element.email}
                                            dob={element.dob}
                                            address={element.address}
                                            postalCode={element.postalCode}
                                            country={element.country}
                                            image={element.image}
                                            Id={element.Id}
                                            mobile={element.mobile}
                                            clickFunction={fetchRequest}

                                        />
                                    )
                                }

                            })}
                    </div>

                </div>
            }



        </div>
    )
}