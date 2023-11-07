import React,{ useState } from "react";
import Control from "./control/Control.js";
import Burger from "./Burger/Burger";
import Summary from "./summary/Summary.js";
import {
  Modal,ModalHeader,ModalFooter,ModalBody,Button
} from "reactstrap";
import { Navigate } from "react-router-dom";
import { addIngredients,removeIngredients,updatePurchasable } from "../../redux/ActionCreator.js";
import { connect } from "react-redux";
import Loading from "../loader/Loading.js";
const mapStateToProps = (state)=>{
  return {
    ingredients:state.ingredients,
    totalPrice:state.totalPrice,
    purchasable:state.purchasable,
    authLoading:state.authLoading,
  }
}
const mapDispatchToProps = dispatch =>{
  return {
    addIngredients: (igtype)=> {
    dispatch(addIngredients(igtype))
    },
    removeIngredients: (igtype)=>{
      dispatch(removeIngredients(igtype))
    },
    updatePurchasable: ()=>{
      dispatch(updatePurchasable())
    }
  }
}

const BurgerBuilder = (props)=>{
  
  const PRICE = {
    salad:20,
    cheese:40,
    meat:90,
  }
  
  const [naviTrue,setNaviTrue] = useState(false);


  const [modalOpen,setModalOpen]= useState(false);
  
 const addIngredientHandle = (type)=>{
  props.addIngredients(type);
  props.updatePurchasable();
 }
 const removeIngredientHandle = (type)=>{
   
   props.removeIngredients(type);
   props.updatePurchasable();
  
   }
   
  
 const toggleModal = ()=>{
   setModalOpen(!modalOpen);
 }
 
 
   
 
 const continueToCheckout = ()=>{
   setNaviTrue(true);
 }
 
 let details = null;
 
 if(props.authLoading){
   details = <Loading />
 }else{
   details =  <div>   <div className="d-flex flex-md-row flex-column">
    <Burger ingredients={props.ingredients} />
    <Control ingredientAdded={addIngredientHandle} removeIngredientHandle={removeIngredientHandle}
    price= {props.totalPrice}
    toggleModal={toggleModal}
    purchasable={props.purchasable}
    />
    </div>
    <Modal isOpen={modalOpen}>
    <ModalHeader>Your order summary</ModalHeader>
    <ModalBody>

    <Summary ingredients={props.ingredients} />
    <h5 className="ms-3">{props.totalPrice.toFixed(0)}</h5>
    </ModalBody>
    <ModalFooter>
    <Button style={{backgroundColor:"#D70F64"}} onClick={continueToCheckout}>Continue to checkout</Button>
    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
    </ModalFooter>
    
    {naviTrue && <Navigate to="/checkout" replace={true} /> }
    </Modal>
    </div>
 }
 
 
 
 
  return(
    <div>
{details}
    </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);