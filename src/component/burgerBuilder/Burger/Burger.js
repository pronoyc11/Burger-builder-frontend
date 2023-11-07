import Ingredient from "../ingredient/Ingredient.js";
import "./Burger.css";

const Burger = (props)=>{
  let ingredientArr = props.ingredients.map(item => {
    let amountArr = [...Array(item.amount).keys()];
 
 return amountArr.map(()=>{
      return <div key={Math.random()}> <Ingredient type={item.type} /> </div>;
        
        
    })
  }).reduce((arr,element)=>{
    /*console.log("re:",element)*/
    return arr.concat(element);
  },[])
  if(ingredientArr.length===0){
    ingredientArr = <p>please put some ingredients here.</p>
  }
  return(
    <div className="Burger">
    <Ingredient type="burgerTop" />
{ingredientArr}
    <Ingredient type="burgerBottom" />
    </div>
    )
}

export default Burger;