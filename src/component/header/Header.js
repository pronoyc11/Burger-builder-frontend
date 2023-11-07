import {
  Navbar,NavbarBrand,NavItem,Nav
} from "reactstrap";
import "./Header.css";
import {
  Link
} from "react-router-dom";
import Logo from "../../assets/logo.png";
import { connect } from "react-redux";

const mapStateToProps = (state)=>{
  return {
    token:state.token,
    userId:state.userId,
  }
}


const Header = (props)=>{
  let links = null;
  if(props.token === null){
    links = <Nav className="mr-md-5">

    <NavItem>
    <Link className="NavLink" to="/login">Log in</Link>
    </NavItem>
    </Nav>
      
      
  }else{
   links =  <Nav className="mr-md-5">
    <NavItem>
    <Link className="NavLink" to="/">Burger Builder</Link>
    </NavItem>
    <NavItem>
    <Link className="NavLink" to="/orders">Orders</Link>
    </NavItem>
    <NavItem>
    <Link className="NavLink" to="/logout">Log Out</Link>
    </NavItem>

    </Nav>
  }
  
  return(
    <div className="Navigation">
    <Navbar style={{backgroundColor:"#D70F64",height:"70px"}}>
    <NavbarBrand className="Brand ml-md-5 mr-auto"  href="/"><img width="80px" src={Logo} /></NavbarBrand>
{links}
    </Navbar>
    </div>
    )
}

export default connect(mapStateToProps)(Header);