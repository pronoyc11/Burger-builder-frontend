import React,{ useState } from "react";
import { useFormik } from "formik";
import { Form,FormGroup,Label,Input,Button,Alert } from "reactstrap";
import { connect } from "react-redux";
import { auth } from "../../redux/AuthActionCreators.js"
import Loading from "../loader/Loading.js";
const mapDispatchToProps = dispatch =>{
  return {
    auth: (Email,Password,userMode)=>{
      dispatch(auth(Email,Password,userMode))
    },
  }
}
const mapStateToProps = state =>{
  return {
    authLoading1:state.authLoading1,
    authFailedMsg:state.authFailedMsg,
  }
}

const Auth = (props)=>{
  let [userMode,setUserMode] = useState("SignUp");
  
  
  
  const formik = useFormik({
    initialValues:{
      email:"",
      password:"",
      confirmPassword:""
    },
    onSubmit: (values,{resetForm}) =>{
     
      let Email = values.email;
      let Password = values.password;
      props.auth(Email,Password,userMode)
      resetForm({values:""});
    },
    validate: (values)=>{
      let error = {}
      if(!values.email){
        error.email = "required";
      }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)){
        error.email= "email is not valid.";
      }
      if(!values.password){
        error.password="required";
      }else if(values.password.length < 5){
        error.password="password must be 5 characters long.";
      }
      if(userMode=="SignUp"){
      if(!values.confirmPassword){
        error.confirmPassword="required";
        
      }else if(values.password!= values.confirmPassword){
        
        error.confirmPassword="password must match.";
      }
      }
      return error;
    },
    
  })
  
  /*functions*/
  const toggleUserMode = ()=>{
if(userMode=="SignUp"){
  setUserMode("LogIn");
}else if(userMode=="LogIn"){
  setUserMode("SignUp");
}
  }
  
  let errMsg = null;
  if(props.authFailedMsg!==null){
    errMsg = <Alert color="danger" >{props.authFailedMsg}</Alert>
  }
  
  
  let authForm = null;
  if(props.authLoading1){
    authForm = <Loading />
  }else{
    authForm = <div>
    <Button onClick={toggleUserMode} style={{width:"100%",backgroundColor:"#D70F64"}} className="btn btn-lg">Switch to {userMode=="SignUp"? "Log in":"Sign Up" }</Button>
<br />
<br />
    <Form onSubmit={formik.handleSubmit}>
  <FormGroup>
    <Label for="exampleEmail">
      Email
    </Label>
    <Input
      id="exampleEmail"
      name="email"
      placeholder="write your email"
      type="email"
      onChange={formik.handleChange}
      value={formik.values.email}
    />
    {formik.errors.email && formik.touched.email && <span style={{color:"red"}}>{formik.errors.email}</span>}
  </FormGroup>
  <FormGroup>
    <Label for="examplePassword">
      Password
    </Label>
    <Input
      id="examplePassword"
      name="password"
      placeholder="password placeholder"
      type="password"
      onChange={formik.handleChange}
      value={formik.values.password}
    />
   {formik.errors.password && formik.touched.password && <span style={{color:"red"}}>{formik.errors.password}</span>}
  </FormGroup>
{ userMode == "SignUp" ? (  <FormGroup>
    <Label for="examplePassword">
      Confirm password
    </Label>
    <Input
      id="confirmPassword"
      name="confirmPassword"
      placeholder="password placeholder"
      type="password"
      onChange={formik.handleChange}
      value={formik.values.confirmPassword}
    />
  {formik.errors.confirmPassword && formik.touched.confirmPassword && <span style={{color:"red"}}>{formik.errors.confirmPassword}</span>}
  </FormGroup>
) : null }
  <Button color="success" type="submit">
    {userMode == "SignUp"?"Sign Up":"Log in"}
  </Button>
</Form>
    </div>
  }
  
  

  return(
<div className="container">
{errMsg}
{authForm}
</div>
    )
  
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);