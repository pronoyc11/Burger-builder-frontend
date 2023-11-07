import * as ActionTypes from "./ActionTypes.js";
import axios from "axios";
import jwtDecode from "jwt-decode";

const authSuccess = (token,userId)=>{
  return {
    type:ActionTypes.AUTH_SUCCESS,
    payload:{
      token:token,
      userId:userId,
    },
  }
}
export const authLoading = (loading)=>{
  return {
    type:ActionTypes.AUTH_LOADING,
    payload:loading,
  }
}
export const authFailed = (errMsg)=>{
  return {
    type:ActionTypes.AUTH_FAILED,
    payload:errMsg,
  }
}

export const auth = (email,password,mode) => dispatch => {
  dispatch(authLoading(true));
  
  const authData = {
    email :email,
    password:password,
  }

  
  let apiUrl = process.env.REACT_APP_BACKEND_URL;
 if(mode === "SignUp"){
  apiUrl= `${apiUrl}/user`;
}else{
apiUrl = `${apiUrl}/user/auth`;
 }
     axios.post(apiUrl,authData).then(res => {
     
     
     localStorage.setItem("token",res.data.token)
     localStorage.setItem("userId",res.data.user._id)
    let expirationTime = new Date(jwtDecode(res.data.token).exp*1000);
    localStorage.setItem("expirationTime",expirationTime);
     
     dispatch(authSuccess(res.data.token,res.data.user._id))
     dispatch(authLoading(false));
     }).catch(err=>{
    
     dispatch(authLoading(false));
     dispatch(authFailed(err.response.data));})
  
}

export const authLogout = ()=>{
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("userId");
  return {
    type:ActionTypes.AUTH_LOGOUT,
    
  }
  
  
}



export const authCheck = ()=> dispatch =>{
  let token = localStorage.getItem("token");
  if(!token){
    //log out 
    dispatch(authLogout());
  }else{
    let expirationTime = new Date(localStorage.getItem("expirationTime"));
    let date = new Date();
    if(date >= expirationTime){
      dispatch(authLogout());
    }else{
      let userId = localStorage.getItem("userId");
      dispatch(authSuccess(token,userId));
    }
    
  }
}