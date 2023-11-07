import * as ActionTypes from "./ActionTypes.js";
import axios from "axios";
export const addIngredients = (igtype)=>{
  return {
    type:ActionTypes.ADD_INGREDIENT,
    payload:igtype,
  }
}

export const removeIngredients  = (igtype)=>{
  return {
    type:ActionTypes.REMOVE_INGREDIENT,
    payload:igtype,
  }
}


export const updatePurchasable = ()=>{
  return {
    type:ActionTypes.UPDATE_PURCHASABLE,
   
  }
}
export const resetIngredient = ()=>{
  return {
    type:ActionTypes.RESET_INGREDIENT,
  }
}
export const loadOrders = (orders) =>{
  return {
    type:ActionTypes.LOAD_ORDERS,
    payload:orders
  }
}
export const loadOrdersFailed = ()=>{
  return {
    type:ActionTypes.LOAD_ORDERS_FAILED,
    
  }
}

export const fetchOrders = (token,userId) => dispatch => {

  axios.get(`${process.env.REACT_APP_BACKEND_URL}/order/`,{
    headers:{
      'Authorization':`Bearer ${token}`
    }
  }).then(res => dispatch(loadOrders(res.data)) ).catch(err=>dispatch(loadOrdersFailed()))
  
}