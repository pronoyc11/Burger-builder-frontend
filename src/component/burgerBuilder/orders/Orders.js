import React,{ useState,useEffect } from "react";
import { fetchOrders } from "../../../redux/ActionCreator.js";
import { connect } from "react-redux";
import Order from "./order/Order.js";
import Loading from "../../loader/Loading.js";


const mapStateToProps = (state)=>{
  return{
    orders:state.orders,
    ordersLoading:state.ordersLoading,
    orderErr:state.orderErr,
    token:state.token,
    userId:state.userId,
  }
}


const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: (token,userId)=> dispatch(fetchOrders(token,userId))
    ,
  }
}


const Orders =  (props)=>{
  
  useEffect(()=>{
   
    props.fetchOrders(props.token,props.userId);
    
  },[])
  
  let orders = null
  if(props.orderErr){
    orders = <p style={{
    border:"1px solid grey",
    borderRadius:"5px",
    padding:"10px",
    boxShadow:"1px 1px #888888"
    
    }}>Sorry,orders couldn't load.</p>
  }else{
  if(props.orders.length === 0){
    orders = <p style={{
    border:"1px solid grey",
    borderRadius:"5px",
    padding:"10px",
    boxShadow:"1px 1px #888888"
    }}>Zero orders are placed.</p>
  }else{
  orders = props.orders.map(order =>{
    return <Order key={order.id} order={order} />
  })
  }
  }
  
  return (
    <div>
    {props.ordersLoading? <Loading /> : orders}
    
    </div>
    
    )
  
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders);