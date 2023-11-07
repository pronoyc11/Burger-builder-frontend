
import { Outlet,Navigate } from "react-router-dom";
import {connect} from "react-redux";

const mapStateToProps = state =>{
  return {
    token:state.token,
    userId:state.userId
  }
}


const PrivateRoute = (props)=>{
 
  return props.token? <Outlet /> : <Navigate to="/login" />
}

export default connect(mapStateToProps)(PrivateRoute);