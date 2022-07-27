import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";

import "../../css/Payment.css"
import "../../css/Admin.css"
import axios from "axios"

export default function AdminDraft() {

    let [draft, setDraft] = useState();
    let [rDraft, setRDraft] = useState([]);

    function handleClick(e) {

        const draftPost = {
            draft: draft
        }

        e.preventDefault();
        axios.post(`${process.env.REACT_APP_SERVER}/admindrafts`, draftPost,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                }
            })
            .then((response) => {
                // console.log(response)
            })
        a = 1;
    }

    let a;
    async function fetchDraft() {

        let temp = [];
        await axios.get(`${process.env.REACT_APP_SERVER}/getdrafts`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("aToken")}`
                }
            })
            .then(async (response) => {
                response.data.forEach(async (element) => {
                    await temp.push(element);
                });

                await setRDraft(temp);
                // await console.log(rDraft)
            })
    }
    useEffect(() => {
        fetchDraft();
        // eslint-disable-next-line
    }, [a]);
    return (

        <div className="payment draft" >

            <h2>Admin Drafts</h2>
            <AdminNavbar />

            <form>
                <textarea
                    placeholder="Enter text"
                    onChange={(e) => {
                        setDraft(e.target.value)
                    }}
                    value={draft}
                    required="required"
                />
                <button type="submit" onClick={handleClick} >Create</button>
            </form>
            {rDraft.map((element) => {
                return (
                    <div>{element.draft}</div>
                )
            })}
        </div>
    )
}