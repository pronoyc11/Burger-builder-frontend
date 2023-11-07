import {
  Card,CardHeader,CardBody,CardFooter,Button
} from "reactstrap";
const controls = [
 { label:"Cheese",type:"cheese"},
 { label:"Salad",type:"salad"},
 { label:"Meat",type:"meat"},
 
 ]
 
 const BuildControls = (props)=>{
   return (
     <div className="d-flex">
     <div className="m-auto ml-5" style={{fontWeight:"bold",fontSize:"1.2rem"}}>{props.label}</div>
     <button className="btn btn-danger btn-sm m-1" onClick={()=>props.removeIngredientHandle(props.type)} >Less</button>
     <button className="btn btn-success btn-sm m-1" onClick={()=>props.ingredientAdded(props.type)}>More</button>
     </div>
     
     )
 }
const Control = (props)=>{
  return (
    <div className="ml-md-5 container" style={{textAlign:"center"}}>
    <Card style={{marginTop:"30px",marginBottom:"30px",textAlign:"center"}}>
    <CardHeader style={{color:"white",backgroundColor:"#D70F64"}}>
    <h4>Add ingredients</h4>
    </CardHeader>
    <CardBody>
    {
      controls.map(item => {
        return (
        <BuildControls key={Math.random()} ingredientAdded={props.ingredientAdded} removeIngredientHandle={props.removeIngredientHandle} label={item.label} type={item.type} />
        )
      })
      
      
    }
    </CardBody>
    <CardFooter>
    <h5>Price:{props.price} BDT</h5>
    </CardFooter>
    <Button style={{backgroundColor:"#D70F64"}} disabled={!props.purchasable} onClick={props.toggleModal}>Order now</Button>
    </Card>
    </div>
    )
}

export default Control;