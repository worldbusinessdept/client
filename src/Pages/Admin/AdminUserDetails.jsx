import React, { useState } from "react";
import "../../css/Payment.css"

import "../../css/Admin.css"
import axios from "axios"
import AdminNavbar from "./AdminNavbar";
import swal from "sweetalert";
import AdminShowUserTransaction from "../components/AdminShowUserTransaction";
import CircularProgress from '@mui/material/CircularProgress';

export default function AdminUserDetails() {

    let [search, setSearch] = useState("");

    let [data, setData] = useState({})
    // let [transactionArray, setTransactionArray] = useState([])
    let [transaction, setTransaction] = useState();

    let [searchButton, setSearchButton] = useState("Search")
    async function handleSearch(e) {
        e.preventDefault();
        setSearchButton(<CircularProgress color="inherit" />)

        axios.post(`${process.env.REACT_APP_SERVER}/admingetuser`, { email: search },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                }
            }).then((response) => {
                setSearchButton("Search")
                if (response.status === 202) {
                    swal(response.data.message, '', 'error')
                } else {
                    if (response.data !== "") {
                        setData(response.data)
                        document.getElementById("adminUserSearchResult").style.display = "block"
                    } else {
                        swal("Email is not registered!", "", "error")
                    }
                }

            }).then(() => {

                axios.post(`${process.env.REACT_APP_SERVER}/tempblockeduserstatus`, { email: search },
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                        }
                    }).then(resp => {
                        if (resp.data.status === "blocked") {
                            document.getElementById("unblockButton").style.display = "block"
                            document.getElementById("blockButton").style.display = "none"
                        } else if (resp.data.status === "unblocked") {
                            document.getElementById("unblockButton").style.display = "none"
                            document.getElementById("blockButton").style.display = "block"
                        }
                    })
            })


        document.getElementById("adminUserTransactionResult").style.display = "none"


    }


    async function handleDelete(e) {
        e.preventDefault();

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover the user!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.post(`${process.env.REACT_APP_SERVER}/admindeleteaccount`, { userId: data.userId },
                        {
                            headers: {
                                "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                            }
                        }).then(() => {
                            swal("User deleted!", {
                                icon: "success",
                            }).then(() => {
                                window.location.reload();
                            })
                        })

                } else {
                    swal("User is not deleted!");
                }
            });

    }


    async function handleTransaction(e) {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_SERVER}/admingetusertransaction`, { userId: data.userId },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                }
            }).then(async (response) => {

                console.log(response.data);
                setTransaction(response.data.transaction);
                document.getElementById("adminUserTransactionResult").style.display = "block"
            })

    }

    async function handleBlock(e) {
        e.preventDefault();

        swal({
            title: "Are you sure?",
            text: "Once blocked, you will be able to unblock the user!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.post(`${process.env.REACT_APP_SERVER}/admintempblockuser`, { email: data.email, action: "block" },
                        {
                            headers: {
                                "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                            }
                        }).then(() => {
                            swal("User blocked!", {
                                icon: "success",
                            }).then(() => {
                                document.getElementById("unblockButton").style.display = "block"
                                document.getElementById("blockButton").style.display = "none"
                                window.location.reload()
                            })
                        })

                } else {
                    swal("User is not blocked!");
                }
            });

    }
    async function handleUnblock(e) {
        e.preventDefault();

        swal({
            title: "Are you sure?",
            text: "Once unblocked, you will be able to block the user!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.post(`${process.env.REACT_APP_SERVER}/admintempblockuser`, { email: data.email, action: "unblock" },
                        {
                            headers: {
                                "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                            }
                        }).then(() => {
                            swal("User unblocked!", {
                                icon: "success",
                            }).then(() => {
                                document.getElementById("unblockButton").style.display = "none"
                                document.getElementById("blockButton").style.display = "block"
                                window.location.reload()
                            })
                        })

                } else {
                    swal("User is not unblocked!");
                }
            });

    }

    return (

        <div className="payment" >
            <div>
                <h2>User Details</h2>
                <AdminNavbar />
                <br />
                <input
                    type="email"
                    placeholder="Search Email"
                    style={{ "width": "100%", "margin": "10px 0 10px 0", "padding": "10px", "fontSize": "16px" }}

                    onChange={(e) => setSearch(e.target.value)}
                />
                <button style={{ "width": "100%" }} onClick={handleSearch} >{searchButton}</button>
                <br />
                <br />
                <div>
                    <div style={{ "border": "2px solid orange", "padding": "4px", "marginBottom": "11px", "display": "none" }} className="adminActivatesAllCards" id="adminUserSearchResult">

                        <div>First Name: <p>{data.fName}</p></div>
                        <div>Last Name: <p>{data.lName}</p></div>
                        <div>Email: <p>{data.email}</p></div>
                        <div>Date of birth: <p>{data.dob}</p></div>
                        <div>Address: <p>{data.address}</p></div>
                        <div>Postal Code: <p>{data.postalCode}</p></div>
                        <div>Country: <p>{data.country}</p></div>
                        <br />
                        <div>Image: <a href={data.image} target="_blank" rel="noreferrer">View image</a></div>
                        <div>ID: <a href={data.Id} target="_blank" rel="noreferrer">View ID</a></div>
                        <br />
                        <div>
                            <button onClick={handleDelete} >Delete Account</button>
                            <button id="unblockButton" onClick={handleUnblock}>Unblock User</button>
                            <button id="blockButton" onClick={handleBlock}>Block User</button>
                            <button onClick={handleTransaction}>View Transactions</button>
                        </div>
                    </div>
                    <div id="adminUserTransactionResult" style={{ "display": "none" }}>
                        <AdminShowUserTransaction transaction={transaction} />
                    </div>
                </div>

            </div>




        </div>
    )
}