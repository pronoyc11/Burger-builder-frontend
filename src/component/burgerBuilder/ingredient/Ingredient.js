import burgerBottom from "../../../assets/images/bottom.png";
import burgerTop from "../../../assets/images/top.png";
import cheese from "../../../assets/images/cheese.png";
import meat from "../../../assets/images/meat.png";
import salad from "../../../assets/images/salad.png";
import "./Ingredient.css";



const Ingredient  = (props)=>{
  
  let ingredient = null;
  switch(props.type){
    case "burgerBottom":
      ingredient = <div><img src={burgerBottom} alt="burgerBottom" /></div>
      break;
    case "burgerTop":
      ingredient = <div><img src={burgerTop} alt="burgerBottom" /></div>
      break;
    case "cheese":
      ingredient = <div><img src={cheese} alt="burgerBottom" /></div>
      break;
    case "meat":
      ingredient = <div><img src={meat} alt="burgerBottom" /></div>
      break;
    case "salad":
      ingredient = <div><img src={salad} alt="burgerBottom" /></div>
      break;
    default:
    ingredient = null
  }
  
  return(
    <div className="Ingredient">
    {ingredient}
    </div>
    )
}

export default Ingredient ;