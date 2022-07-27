import React, { useState } from "react";
import "../../css/Payment.css"

import AdminNavbar from "./AdminNavbar";
import AdminBalanceControlCard from "../components/AdminBalanceControlCard";
import axios from "axios"

import CircularProgress from '@mui/material/CircularProgress';
import swal from "sweetalert";

export default function AdminbalanceControl() {
    let [data, setData] = useState(null);
    let [search, setSearch] = useState("");
    let [filteredArray]=useState([]);

    let [searchButton, setSearchButton]=useState('Search')
    async function fetchData() {
        setSearchButton(<CircularProgress color="inherit" />)
        await axios.post(`${process.env.REACT_APP_SERVER}/admingetuser`, {email: search},
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("aToken")}`
            }
        })
            .then(async (response) => {

                setSearchButton('Search')
                if (response.status === 202) {
                    swal(response.data.message, '', 'error')
                }else{
                    await setData(response.data)
                }
                
                // await setFilteredArray(response.data)

                // await console.log(data)
            })
    }

   
   
    return (
        <div className="payment" >
            {filteredArray === undefined
                ? <h1>loading....</h1>
                    

                :
                <div style={{ "textAlign": "center" }} >
                    <h2>Balance Control</h2>
                    <AdminNavbar />
                    <input
                        type="search"
                        placeholder="Search Email"
                        style={{ "width": "100%", "margin": "10px 0 10px 0", "padding": "10px", "fontSize": "16px" }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button onClick={fetchData} >{searchButton}</button>
                    <br/>
                    <br/>
                    {data!==null &&
                            <AdminBalanceControlCard
                                fName={data.fName}
                                lName={data.lName}
                                email={data.email}
                                prime={data.prime}
                                classic={data.classic}
                                userId={data.userId}
                                clickFunction={fetchData}
                                balance={data.balance}

                            />
                        }
                </div>
            }


        </div>
    )
}
























//OLD Version
// import React, { useEffect, useState } from "react";
// import "../../css/Payment.css"

// import AdminNavbar from "./AdminNavbar";
// import AdminBalanceControlCard from "../components/AdminBalanceControlCard";
// import axios from "axios"

// export default function AdminbalanceControl() {
//     let [data, setData] = useState();
//     let [search, setSearch] = useState("");
//     let [filteredArray, setFilteredArray]=useState([]);

//     async function fetchData() {
//         await axios.get(`${process.env.REACT_APP_SERVER}/getalluser`)
//             .then(async (response) => {
//                 await setData(response.data)
//                 await setFilteredArray(response.data);
//                 // await console.log(data)
//             })
//     }

//     async function handleSearch() {
//         // console.log(1)
//         await setFilteredArray(data.filter((c) => { return c.email.includes(search)}))
//     }
//     useEffect(() => {
//         fetchData();
//         // eslint-disable-next-line
//     }, []);

//     useEffect(() => {
//         handleSearch();
//         // eslint-disable-next-line
//     }, [search]);
//     return (
//         <div className="payment" >
//             {filteredArray === undefined
//                 ? <h1>loading....</h1>
                    

//                 :
//                 <div style={{ "textAlign": "center" }} >
//                     {/* {console.log(data)} */}
//                     <h2>Balance Control</h2>
//                     <AdminNavbar />
//                     <input
//                         type="search"
//                         placeholder="Search Email"
//                         style={{ "width": "100%", "margin": "10px 0 10px 0", "padding": "10px", "fontSize": "16px" }}

//                         onChange={(e) => setSearch(e.target.value)}
//                     />

//                     {filteredArray.map((element) => {

//                         return (
//                             <AdminBalanceControlCard
//                                 fName={element.fName}
//                                 lName={element.lName}
//                                 email={element.email}
//                                 prime={element.prime}
//                                 classic={element.classic}
//                                 userId={element.userId}
//                                 clickFunction={fetchData}
//                                 balance={element.balance}

//                             />
//                         )
//                     })}
//                 </div>
//             }


//         </div>
//     )
// }