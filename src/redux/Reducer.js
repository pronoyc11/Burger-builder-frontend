 import * as ActionTypes from "./ActionTypes.js";
 
  const INGREDIENT_PRICE = {
    salad:20,
    cheese:40,
    meat:90,
  }
  
  const INITIAL_STATE = {
    ingredients: [
    { type:"cheese",amount:0},
    { type:"salad",amount:0},
    { type:"meat",amount:0},
    ],
    orders:[],
    ordersLoading:true,
    orderErr:false,
   authLoading:true,
   authLoading1:false,
   authFailedMsg:"",
    token:null,
    userId:null,
    totalPrice:80,
    purchasable:false,
    
  }
  
 export const Reducer = (state=INITIAL_STATE,action)=>{
      let allIngredient = [...state.ingredients];
   switch(action.type){
     case ActionTypes.ADD_INGREDIENT:
       
  for(let item of allIngredient){
     
     if(item.type === action.payload) item.amount++;
  
   }
   return {...state,
   ingredients:allIngredient,
   totalPrice: state.totalPrice + INGREDIENT_PRICE[action.payload],
     
   }
   
   
       break;
     case ActionTypes.REMOVE_INGREDIENT:
       
       /*remove*/
              let newPrice = state.totalPrice;
  for(let item of allIngredient){
     
     if(item.type === action.payload){
       if(item.amount<=0){
         return state;
       }else{
         item.amount--;
         if(state.totalPrice > 80){
           newPrice = state.totalPrice - INGREDIENT_PRICE[action.payload];
         }
     }
     }
   }
   return {...state,
   ingredients:allIngredient,
   totalPrice: newPrice,
     
   }
   
   /*over*/
       break;
     case ActionTypes.UPDATE_PURCHASABLE:
       let sum = state.ingredients.reduce((sum,element)=>{
     return sum += element.amount ;
   },0);
   return {...state,

     purchasable: sum > 0,
   }
       break;
   case ActionTypes.RESET_INGREDIENT:
     return {...state,
         ingredients: [
    { type:"cheese",amount:0},
    { type:"salad",amount:0},
    { type:"meat",amount:0},
    ],
    totalPrice:80,
    purchasable:false,
       
     }
    case ActionTypes.LOAD_ORDERS:
      let orders = [];
      for(let key in action.payload){
        orders.push({...action.payload[key],
        id:key,
          
        })
      }
     return {...state,
     orders:orders,
     ordersLoading:false,
     orderErr:false,
       
     }
      
      
      break;
      case ActionTypes.LOAD_ORDERS_FAILED:
       return {...state,
       orderErr:true,
       ordersLoading:false,
         
       }
      break;
     /*auth cases*/
    case ActionTypes.AUTH_SUCCESS:
      return{...state,
        token:action.payload.token,
        userId:action.payload.userId,
        authLoading:false,
        
      }
      break;
    case ActionTypes.AUTH_LOGOUT:
      return {...state,
        token:null,
        userId:null,
       authLoading:true,
       authFailedMsg:null,
      }
      break;
    case ActionTypes.AUTH_LOADING:
      return {...state,
        authLoading1:action.payload,
      }
      break;
    case ActionTypes.AUTH_FAILED:
      return {...state,
        authFailedMsg:action.payload,
      }
   default :
   return state;
   }/*switch*/
 }