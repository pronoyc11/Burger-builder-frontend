import React,{ useEffect } from "react";
import BurgerBuilder from "./burgerBuilder/BurgerBuilder.js"
import Header from "./header/Header.js";
import { Routes,Route,Navigate,Outlet } from "react-router-dom";
import Orders from "./burgerBuilder/orders/Orders.js"
import Checkout from "./burgerBuilder/orders/checkout/Checkout.js"
import Auth from "./auth/Auth.js";
import { connect } from "react-redux";
import PrivateRoute from "./auth/PrivateRoute.js"
import { authCheck } from "../redux/AuthActionCreators.js";
import Logout from "./auth/Logout.js";
import Payment from "./burgerBuilder/orders/checkout/Payment.jsx";
const mapStateToProps = state =>{
  return {
    token : state.token,
    userId:state.userId,
  }
}
const mapDispatchToProps = dispatch =>{
  return {
    authCheck : ()=>{
      dispatch(authCheck());
    },
  }
}
const MainComponent = (props)=>{
  
  useEffect(()=>{
    props.authCheck();
  },[])
  return (
    <div>
    
    <Header />
    <div className="container">
    <Routes>
<Route element={props.token===null?<Outlet />:<Navigate to="/" />} >
   <Route path="/login" element = {<Auth />} />
</Route>
 
   <Route element={<PrivateRoute />} >
      <Route path="/" element = {<BurgerBuilder />} />
   <Route path="/orders" element = {<Orders />} />
   <Route path="/logout" element = {<Logout />} />
   <Route path="/checkout" element = {<Checkout />} />
   </Route>
   <Route path="/payment" element = {<Payment />} />
    </Routes>
    </div>
    </div>
    
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(MainComponent);