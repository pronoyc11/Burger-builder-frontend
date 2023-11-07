import React,{ useEffect } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { authLogout } from "../../redux/AuthActionCreators.js";
const mapDispatchToProps = dispatch =>{
  return {
    authLogout:()=>{
      dispatch(authLogout());
    },
  }
}
const Logout = (props)=>{
  useEffect(()=>{
    props.authLogout();
  },[])
  
  
  return (
   
    <Navigate to="/" />
    
    
    )
}

export default connect(null,mapDispatchToProps)(Logout);