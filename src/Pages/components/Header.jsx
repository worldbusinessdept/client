import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import CancelIcon from "@material-ui/icons/Cancel";
import { Link } from "react-router-dom";
import axios from "axios";

import Logo from "../../Assets/Logo.jpg"
import "../../css/Payment.css"
function Header() {
    const [burgerStatus, setBurgerStatus] = useState(false);



    let [balance, setBalance] = useState(0);
    useEffect(() => {
        if (localStorage.getItem("data")) {
            axios.post(`${process.env.REACT_APP_SERVER}/getuser`, { userId: JSON.parse(localStorage.getItem("data")).userId },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then((response) => {
                    setBalance(response.data.balance)
                })
        } else {
            setBalance(0);
        }
    }, [])
    return (
        <Container>
            <Link to="/">
                <img
                    src={Logo}
                    alt="Logo"
                    id="logo"
                />
            </Link>

            <RightMenu>
                <CustomMenu onClick={() => setBurgerStatus(true)} />
                {/* this allows menu to open as we Click on it */}
            </RightMenu>
            <BurgerNav show={burgerStatus}>
                <CloseWrapper>
                    <CustomClose onClick={() => setBurgerStatus(false)} />
                    {/* this allows menu to close as we Click on it */}
                </CloseWrapper>

                <NavBlack  >
                    <li>
                        <Link to="/" onClick={() => setBurgerStatus(false)}  >Home</Link>
                    </li>
                </NavBlack>

                {localStorage.getItem("token")
                    ? <NavBlack>
                        <li>
                            <Link to="/user/dashboard" onClick={() => setBurgerStatus(false)} >Dashboard</Link>
                        </li>
                    </NavBlack>
                    : null
                }

                {localStorage.getItem("token")
                    ? <NavBlack>
                        <li>
                            <Link to="/account" onClick={() => setBurgerStatus(false)} >My Account</Link>
                        </li>
                    </NavBlack>
                    : null
                }
                {localStorage.getItem("token")
                    ? <NavBlack>
                        <li>
                            <Link to="/card" onClick={() => setBurgerStatus(false)} >Active Debit Card</Link>
                        </li>
                    </NavBlack>
                    : null
                }
                {localStorage.getItem("token")
                    ? <NavBlack>
                        <li>
                            <Link to="/withdrawal" onClick={() => setBurgerStatus(false)} >Withdrawal</Link>
                        </li>
                    </NavBlack>
                    : null
                }
                {localStorage.getItem("token")
                    ? <NavBlack>
                        <li>
                            <Link to="/user/report" onClick={() => setBurgerStatus(false)} >Report</Link>
                        </li>
                    </NavBlack>
                    : null
                }
                {localStorage.getItem("token")
                    ?
                    <NavBlack>
                        <li>
                            <Link to="/user/support" onClick={() => setBurgerStatus(false)} >Support</Link>
                        </li>
                    </NavBlack>
                    : null
                }
                {localStorage.getItem("token")
                    ?
                    <NavBlack>
                        <li>
                            <Link to="/user/transaction" onClick={() => setBurgerStatus(false)} >My Transaction</Link>
                        </li>
                    </NavBlack>
                    : null
                }










                {localStorage.getItem("token")
                    ? <NavBlack>
                        <li onClick={() => setBurgerStatus(false)}>
                            <Link to="/">
                                <div onClick={() => { localStorage.clear() }}>Log Out</div>
                            </Link>
                        </li>
                    </NavBlack>
                    : <NavBlack>
                        <li onClick={() => setBurgerStatus(false)}>
                            <Link to="/signup">
                                Sign Up
                            </Link>
                        </li>
                    </NavBlack>
                }

                {localStorage.getItem("data")
                    ? <NavBlack>
                        <li onClick={() => setBurgerStatus(false)}>
                            <Link to="/user/myaccount">${balance}</Link>
                        </li>
                    </NavBlack>
                    : <NavBlack>
                        <li onClick={() => setBurgerStatus(false)}>
                            <Link to="/login">Log In</Link>
                        </li>
                    </NavBlack>
                }
            </BurgerNav>
        </Container>
    );
}

export default Header;

const Container = styled.div`
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;
const NavBlack = styled.div`
background-image: linear-gradient(rgb(29, 22, 22),rgb(43, 42, 42),rgb(10, 15, 13));   
background-color:black;
text-align:center;

&:hover{
    background-image: black);
   
    box-shadow: inset 0 0 60px whitesmoke,
    inset 20px 0 80px rgb(185, 14, 14),
    inset -20px 0 80px rgb(231, 10, 10),
    inset 20px 0 300px rgb(230, 40, 40),
    inset -20px 0 300px rgb(231, 20, 20),
    0 0 50px #fff,
    -10px 0 80px rgb(255, 0, 0),
    10px 0 80px rgb(190, 16, 4);
}


`;
// const Menu = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: black;
//   flex: 1;

//   a {
//     font-weight: 600;

//     font-family: -webkit-pictograph;
//     padding: 0 15px;
//     flex-wrap: nowrap;
//   }
//   @media (max-width: 768px) {
//     display: none;
//   }
// `;

const RightMenu = styled.div`
  display: flex;
  align-items: center;
  a {
    font-weight: 600;
    text-transform: uppercase;
    margin-right: 10px;
  }
`;
const CustomMenu = styled(MenuIcon)`
  color: white;
  cursor: pointer;
`;
const BurgerNav = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  background: black;
  width: 300px;
  z-index: 16;
  list-style: none;
  padding: 20px;
  display: flex;
  flex-direction: column;
  text-align: start;
  transform: ${(props) =>
        props.show
            ? "translateX(0)"
            : "translateX(100%)"}; /* we can move somethimg to wards right by translateX */
  transition: transform 0.3s;

  li {
    padding: 15px 0;
    border-bottom: 1px solid #df2d07;

    Link {
      font-weight: 600;
    }
  }
  /*    &:hover{
        li{
            background-color:black;
            background-image: linear-gradient(rgb(253, 18, 18),rgb(243, 60, 60)); 
        }

    } */
`;

const CustomClose = styled(CancelIcon)`
  cursor: pointer;
  color: white;
`;

const CloseWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

// Old version!!!!

// import React,{useState} from 'react';
// import styled from 'styled-components';
// import MenuIcon from '@material-ui/icons/Menu';
// import CancelIcon from '@material-ui/icons/Cancel';
// import { Link, useHistory } from 'react-router-dom';

// function Header() {
//     const [burgerStatus,setBurgerStatus] = useState(false);
//     // const cars =useSelector(selectCars)
//     let history=useHistory();

//     return (
//         <Container>
//             <Link to="/" >
//              <img style={{"width":"20%"}} src="https://swiftbusinesspay.site/wp-content/uploads/2021/10/PicsArt_09-24-01.22.38-scaled-1.jpg" alt="Logo" />

//             </Link>

//         <RightMenu>
//             <CustomMenu onClick={()=> setBurgerStatus(true)}/>{/* this allows menu to open as we Click on it */}
//         </RightMenu>
//         <BurgerNav show={burgerStatus}>

//           <CloseWrapper>
//           <CustomClose onClick={() =>setBurgerStatus(false)} />{/* this allows menu to close as we Click on it */}
//               </CloseWrapper>
//              {/*  {cars && cars.map((car,index)=>(
//                    <li key ={index}> <a key={index} href ="#">{car}</a></li>
//                    ))} */}
//             <Link to="/" >
//                 Home
//             </Link>
//             <Link to="/user/dashboard" >
//                 Dashboard
//             </Link>
//             <Link to="/account" >
//                 My Account
//             </Link>
//             <Link to="/card" >
//                 Activate Debit Card
//             </Link>
//             <Link to="/withdrawal" >
//                 Withdrawal
//             </Link>
//             <Link to="/" >
//                 Report
//             </Link>
//             <Link to="/" >
//                 Support
//             </Link>
//             <Link to="/logout" >
//                 {localStorage.getItem("data") ? <button onClick={()=>{localStorage.clear()}} >Logout</button> : null}

//             </Link>
//             <Link to="/user/myaccount" >
//                 $0.00
//             </Link>

//         </BurgerNav>
//         </Container>

//     )
// }

// export default Header;

// const Container = styled.div`
//     height:60px;

//     display:flex;
//     align-items:center;
//     justify-content:space-between;
//     padding:40px;
//     top:0;
//     left:0;
//     right:0;
//     z-index:1;
// `
// const Menu= styled.div`
//     display:flex;
//     align-items:center;
//     justify-content:center;
//     color:black;
//     flex:1;

//     a{
//         font-weight:600;

//        font-family: -webkit-pictograph;
//         padding:0 15px;
//         flex-wrap:nowrap;
//     }
//     @media(max-width:768px){
//         display:none;
//     }
// `

// const RightMenu= styled.div`
// display:flex;
// align-items:center;
// a{
//     font-weight:600;
//     text-transform:uppercase;
//     margin-right:10px;
// }

// `
// const CustomMenu = styled(MenuIcon)`
//     color:white;
//     cursor:pointer;
// `
// const BurgerNav= styled.div`
//     position: fixed;
//     top:0;
//     bottom:0;
//     right:0;
//     background:black;
//     width:300px;
//     z-index:16;
//     list-style:none;
//     padding:20px;
//     display: flex;
//     flex-direction: column;
//     text-align:start;
//     transform:${props => props.show ?'translateX(0)':'translateX(100%)'};/* we can move somethimg to wards right by translateX */
//     transition:transform 0.3s ;

//     li{
//         padding:15px 0;
//        border-bottom:1px solid rgba(0,0,0,0.2);
//         a{
//             font-weight:600;
//         }
//     }

// `

// const CustomClose = styled(CancelIcon)`
//     cursor:pointer;
//     color: white
// `

// const CloseWrapper=styled.div`
// display:flex;
// justify-content:flex-end;
// `
