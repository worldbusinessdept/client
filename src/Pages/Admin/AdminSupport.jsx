import React, { useEffect, useState } from "react";
import "../../css/Payment.css"

import AdminNavbar from "./AdminNavbar";
import AdminSupportCard from "../components/AdminSupportCard";
import axios from "axios"

export default function AdminSupport() {
    let [data, setData] = useState();
    let [search, setSearch] = useState("");
    let [filteredArray, setFilteredArray] = useState([]);

    async function fetchData() {
        await axios.get(`${process.env.REACT_APP_SERVER}/admingetallsupport`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                }
            })
            .then(async (response) => {
                await setData(response.data)
                await setFilteredArray(response.data);
                // await console.log(data)
            })
    }

    async function handleSearch() {
        // console.log(1)
        await setFilteredArray(data.filter((c) => { return c.email.includes(search) }))
    }
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        handleSearch();
        // eslint-disable-next-line
    }, [search]);
    return (
        <div className="payment" >
            {filteredArray === undefined
                ? <h1>loading....</h1>


                :
                <div style={{ "textAlign": "center" }} >
                    {/* {console.log(data)} */}
                    <h2>Support</h2>
                    <AdminNavbar />
                    <input
                        type="search"
                        placeholder="Search Email"
                        style={{ "width": "100%", "margin": "10px 0 10px 0", "padding": "10px", "fontSize": "16px" }}

                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {filteredArray.map((element) => {

                        return (
                            <AdminSupportCard
                                email={element.email}
                                subject={element.subject}
                                description={element.description}
                                attachment={element.attachment}
                                actionTaken={element.actionTaken}
                                id={element._id}
                                clickFunction={fetchData}

                            />
                        )
                    })}
                </div>
            }


        </div>
    )
}