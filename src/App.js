import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Payment from "./Pages/Payment";
import VerifyOtp from "./Pages/SignupPages/VerifyOtp";
import ActiveDebitCard from "./Pages/ActiveDebitCard";
import BankWithdrawal from "./Pages/BankWithdrawal";
import BitcoinWithdrawal from "./Pages/BitcoinWithdrawal";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import ClassicMasterCard from "./Pages/CheckoutMethodPages/ClassicMasterCard";
import MerchantMasterCard from "./Pages/CheckoutMethodPages/MerchantMasterCard";
import DebitCardDetails from "./Pages/CheckoutMethodPages/DebitCardDetails";
import InactivePage from "./Pages/CheckoutMethodPages/InactivePage";
import Paypal from "./Pages/CheckoutMethodPages/Paypal";
import PrimeMasterCard from "./Pages/CheckoutMethodPages/PrimeMasterCard";
import BitcoinAccepted from "./Pages/BitcoinAccepted"
import Account from "./Pages/MyAccount";
import Withdrawal from "./Pages/Withdrawal";
// import CurrentNavbar from "./Pages/components/CurrentNavbar";
// import Footer from "./Pages/components/Footer";
import Wallet from "./Pages/Wallet";
import AdminLogin from "./Pages/AdminLogin";
import AdminHome from "./Pages/Admin/AdminHome";
import AdminDraft from "./Pages/Admin/AdminDrafts";
import AdminStatus from "./Pages/Admin/AdminStatus";
import Profile from "./Pages/Profile"
import Dashboard from "./Pages/Dashboard"
import Header from "./Pages/components/Header"
import ForgotPassword from "./Pages/ForgotPassword";
import WorldEliteMasterCard from "./Pages/CheckoutMethodPages/WorldEliteMasterCard"
import TitaniumMasterCard from "./Pages/CheckoutMethodPages/TitaniumMasterCard"
import PersonalInformation from "./Pages/SignupPages/PersonalInformation";
import RequestSent from "./Pages/SignupPages/RequestSent";
import SecureAccount from "./Pages/SignupPages/SecureAccount";
import ActivateDeactivateCard from "./Pages/Admin/ActivateDeactivateCard";
import Report from "./Pages/Report";
import Support from "./Pages/Support";
import AdminBalanceControl from "./Pages/Admin/AdminBalanceControl"



import FundTransfer from "./Pages/FundTransfer";
import ChangePassword from "./Pages/ChangePassword";



import UserTransaction from "./Pages/UserTransaction";
import AdminBulkTransferAction from "./Pages/Admin/AdminBulkTransferAction";
import AdminBulkRegisterUser from "./Pages/Admin/AdminBulkRegisterUser";
import AdminReport from "./Pages/Admin/AdminReport";
import AdminSupport from "./Pages/Admin/AdminSupport";
import AdminUserDetails from "./Pages/Admin/AdminUserDetails";
import AdminSingleUserRegistration from "./Pages/Admin/AdminSingleUserRegistration";
import AdminSendInterest from "./Pages/Admin/AdminSendInterest";

import AdminChangePaymentAddress from "./Pages/Admin/AdminChangePaymentAddress";
function App() {
    return (

        <div>

            <Router>
                {/* <CurrentNavbar /> */}
                <Header />

                <Switch>

                    <Route exact path="/" >
                        <Home />
                    </Route>

                    <Route exact path="/login" >
                        {localStorage.getItem("token") ? <Dashboard /> : <Login />}
                        {/* <Login /> */}
                    </Route>

                    <Route exact path="/signup" >
                        {localStorage.getItem("token") ? <Dashboard /> : <Signup />}

                    </Route>

                    <Route exact path="/logout" >
                        <>
                            <Home />
                        </>
                    </Route>

                    <Route exact path="/payment" >
                        <Payment />
                    </Route>

                    <Route exact path="/card" >
                        {localStorage.getItem("token") ? <ActiveDebitCard /> : <Login />}
                    </Route>

                    <Route exact path="/bankwithdrawal" >
                        <BankWithdrawal />
                    </Route>

                    <Route exact path="/bitcoinwithdrawal" >
                        <BitcoinWithdrawal />
                    </Route>

                    <Route exact path="/cart" >
                        <Cart />
                    </Route>

                    <Route exact path="/checkout" >
                        <Checkout />
                    </Route>

                    <Route exact path="/classicmastercard" >
                        <ClassicMasterCard />
                    </Route>

                    <Route exact path="/merchantmastercard" >
                        <MerchantMasterCard />
                    </Route>

                    <Route exact path="/debitcarddetails" >
                        <DebitCardDetails />
                    </Route>

                    <Route exact path="/inactivepage" >
                        <InactivePage />
                    </Route>

                    <Route exact path="/paypal" >
                        <Paypal />
                    </Route>

                    <Route exact path="/primemastercard" >
                        <PrimeMasterCard />
                    </Route>

                    <Route exact path="/bitcoinaccepted" >
                        <BitcoinAccepted />
                    </Route>

                    <Route exact path="/account" >
                        {localStorage.getItem("token") ? <Account /> : <Login />}
                        {/* <Account/> */}
                    </Route>

                    <Route exact path="/withdrawal" >
                        <Withdrawal />
                    </Route>

                    <Route exact path="/wallet" >
                        <Wallet />
                    </Route>

                    <Route exact path="/8088bfca37b5ca125446a8e4a2b23cdbf76972ae" >
                        {localStorage.getItem("aToken") ? <AdminHome /> : <AdminLogin />}

                    </Route>

                    <Route exact path="/8088bfca37b5ca125446a8e4a2b23cdbf76972ae/home" >
                        {localStorage.getItem("aToken") ? <AdminHome /> : <Home />}
                    </Route>

                    <Route exact path="/8088bfca37b5ca125446a8e4a2b23cdbf76972ae/drafts" >
                        {localStorage.getItem("aToken") ? <AdminDraft /> : <Home />}
                    </Route>

                    <Route exact path="/8088bfca37b5ca125446a8e4a2b23cdbf76972ae/status" >
                        {localStorage.getItem("aToken") ? <AdminStatus /> : <Home />}
                    </Route>

                    <Route exact path="/user/profile" >
                        <Profile />
                    </Route>

                    <Route exact path="/user/dashboard" >
                        {localStorage.getItem("token") ? <Dashboard /> : <Home />}
                    </Route>

                    <Route exact path="/forgotpassword" >
                        <ForgotPassword />
                    </Route>

                    <Route exact path="/worldelitemastercard" >
                        <WorldEliteMasterCard />
                    </Route>

                    <Route exact path="/titaniummastercard" >
                        <TitaniumMasterCard />
                    </Route>

                    <Route exact path="/signup/verifyotp" >
                        <VerifyOtp />
                    </Route>

                    <Route exact path="/signup/personalinformation" >
                        <PersonalInformation />
                    </Route>

                    <Route exact path="/signup/requestsent" >
                        <RequestSent />
                    </Route>

                    <Route exact path="/signup/secureaccount" >
                        <SecureAccount />
                    </Route>

                    <Route exact path="/8088bfca37b5ca125446a8e4a2b23cdbf76972ae/activatedeactivatecard" >
                        {localStorage.getItem("aToken") ? <ActivateDeactivateCard /> : <Home />}


                    </Route>

                    <Route exact path="/user/report" >
                        <Report />
                    </Route>

                    <Route exact path="/user/support" >
                        <Support />
                    </Route>

                    <Route exact path="/8088bfca37b5ca125446a8e4a2b23cdbf76972ae/adminbalancecontrol" >
                        {localStorage.getItem("aToken") ? <AdminBalanceControl /> : <Home />}


                    </Route>

                    <Route exact path="/user/fundtransfer" >
                        <FundTransfer />
                    </Route>

                    <Route exact path="/user/changepassword" >
                        <ChangePassword />
                    </Route>

                    <Route exact path="/user/transaction" >
                        <UserTransaction />
                    </Route>

                    <Route exact path="/8088bfca37b5ca125446a8e4a2b23cdbf76972ae/adminbulktransferaction" >
                        {localStorage.getItem("aToken") ? <AdminBulkTransferAction /> : <Home />}


                    </Route>

                    <Route exact path="/8088bfca37b5ca125446a8e4a2b23cdbf76972ae/adminbulkregisteruser" >
                        {localStorage.getItem("aToken") ? <AdminBulkRegisterUser /> : <Home />}


                    </Route>

                    <Route exact path="/8088bfca37b5ca125446a8e4a2b23cdbf76972ae/adminreport" >
                        {localStorage.getItem("aToken") ? <AdminReport /> : <Home />}


                    </Route>

                    <Route exact path="/8088bfca37b5ca125446a8e4a2b23cdbf76972ae/adminsupport" >
                        {localStorage.getItem("aToken") ? <AdminSupport /> : <Home />}


                    </Route>

                    <Route exact path="/8088bfca37b5ca125446a8e4a2b23cdbf76972ae/userdetails" >
                        {localStorage.getItem("aToken") ? <AdminUserDetails /> : <Home />}


                    </Route>

                    <Route exact path="/8088bfca37b5ca125446a8e4a2b23cdbf76972ae/singleuserregistration" >
                        {localStorage.getItem("aToken") ? <AdminSingleUserRegistration /> : <Home />}


                    </Route>
                    <Route exact path="/8088bfca37b5ca125446a8e4a2b23cdbf76972ae/adminsendinterest" >
                        {localStorage.getItem("aToken") ? <AdminSendInterest /> : <Home />}


                    </Route>
                    <Route exact path="/8088bfca37b5ca125446a8e4a2b23cdbf76972ae/adminchangepaymentaddress" >
                        {localStorage.getItem("aToken") ? <AdminChangePaymentAddress /> : <Home />}


                    </Route>





                </Switch>

            </Router>
        </div>
    );
}
export default App;