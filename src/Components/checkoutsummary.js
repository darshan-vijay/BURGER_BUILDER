import React from "react";
import Burger from '../Components/Burger/Burger';
import Button from '../Components/UI/Button';
import classes from './checkoutsummary.module.css'
const Checkoutsummary = (props) =>{
return(
    <div className={classes.CheckoutSummary}>
        <h1>Hope that tastes well</h1>
        <div style={{width:'100%',margin:'auto'}}>
          <Burger ingredients={props.ingredients} />
        </div>
        <Button btntyp="Danger" 
        clicked={props.checkoutcancelled}>CANCEL</Button>
        <Button btntyp="Success"
        clicked={props.checkoutcontinued} >CONTINUE</Button>

    </div>
);
}
export default Checkoutsummary;