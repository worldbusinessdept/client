import React from "react";
import "../../css/ActiveCards.css"

import {useHistory} from "react-router-dom"
// import axios from "axios"
export default function ActiveCards(props) {
    let history=useHistory();

    // let [button, setButton] = useState("Activate Now");
    // let [counter, setCounter]=useState();
    // useEffect(() => {
    //     let card = JSON.parse(localStorage.getItem("card"));
    //     card.forEach(element => {
    //         if (props.name === element.name) {
    //             if (element.isPending === true) {
    //                 setButton("Approval Pending")
    //             } else if (element.isActivated === true) {
    //                 setButton("Activated")
    //             }
    //         }
    //     });
    // }, [counter, props.name]);


    // const data = {
    //     cardName: props.name,
    //     userId: JSON.parse(localStorage.getItem("data")).userId,
    // }
    async function handleClick() {
        history.push(props.route)
        // console.log(data);
        // await axios.post(`${process.env.REACT_APP_SERVER}/requestverification`, data)
        //     .then(async () => {
        //         await axios.post(`${process.env.REACT_APP_SERVER}/getcarddetails`, { userId: JSON.parse(localStorage.getItem("data")).userId })
        //             .then(async (response) => {
        //                 await console.log(response.data);
        //                 await localStorage.setItem("card", JSON.stringify(response.data));
        //                 await setCounter(1);
        //             })
        //     }
        //     )


    }


    return (
        <div className="activeCards" >

            <h2 style={{ "color": "white" }} >{props.cardName}</h2>
            <br />
            <img src={props.image} alt="card" />
            <h2>${props.amount}</h2>
            <h4>USD in Bitcoin Value</h4>
            <h3>Withdrawal Limit ${props.limit}/Day</h3>
            <br />
            <div className="activeCardsIcons" >
                <h4><i class="far fa-check-circle" /> Worldwide Accepted</h4>
                <h4><i class="fas fa-gifts" /> Get Rewards on Purchase</h4>
                <h4><i class="fas fa-thumbs-up" /> Instant Approval</h4>
                <h4><i class="fas fa-cart-plus" /> Get More</h4>
            </div>
            <br />
            <button 
                type="submit" 
                onClick={handleClick} 
            >Activate Now</button>
            <br />
            <hr style={{ "width": "60%" }} />
            <br />
            <br />
        </div>
    )
}