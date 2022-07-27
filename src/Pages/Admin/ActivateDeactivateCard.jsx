import React, { useState } from "react";
import "../../css/Payment.css"

import AdminNavbar from "./AdminNavbar";
import AdminActivatesAllCards from "../components/AdminActivatesAllCards";
import axios from "axios"

import CircularProgress from '@mui/material/CircularProgress';
import swal from "sweetalert";

export default function ActivateDeactivateCard() {
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
                    console.log(data)
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
                    {/* {console.log(data)} */}
                    <h2>Activate Deactive Card</h2>
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
                                <AdminActivatesAllCards
                                fName={data.fName}
                                lName={data.lName}
                                email={data.email}
                                prime={data.prime}
                                classic={data.classic}
                                userId={data.userId}
                                primeData={data.primeData}
                                classicData={data.classicData}
                                image={data.image}
                                Id={data.Id}
                                clickFunction={fetchData}

                            /> }
                    
                    
                </div>
            }


        </div>
    )
}





















//OLD Version
// import React, { useEffect, useState } from "react";
// import "../../css/Payment.css"

// import AdminNavbar from "./AdminNavbar";
// import AdminActivatesAllCards from "../components/AdminActivatesAllCards";
// import axios from "axios"

// export default function ActivateDeactivateCard() {
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
//                     <h2>Activate Deactive Card</h2>
//                     <AdminNavbar />
//                     <input
//                         type="search"
//                         placeholder="Search Email"
//                         style={{ "width": "100%", "margin": "10px 0 10px 0", "padding": "10px", "fontSize": "16px" }}

//                         onChange={(e) => setSearch(e.target.value)}
//                     />

//                     {filteredArray.map((element) => {
                       
//                         return (
//                             <AdminActivatesAllCards
//                                 fName={element.fName}
//                                 lName={element.lName}
//                                 email={element.email}
//                                 prime={element.prime}
//                                 classic={element.classic}
//                                 userId={element.userId}
//                                 primeData={element.primeData}
//                                 classicData={element.classicData}
//                                 image={element.image}
//                                 Id={element.Id}
//                                 clickFunction={fetchData}

//                             />
//                         )
//                     })}
//                 </div>
//             }


//         </div>
//     )
// }
