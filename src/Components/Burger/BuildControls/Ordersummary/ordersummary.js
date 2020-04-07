import React, { Component } from 'react';
import Aux from '../../../../hoc/Auxillary'
import Button from '../../../UI/Button'

class Ordersummary extends Component{
   
render()
{
    const ingredientsummary = Object.keys(this.props.ingredients).map(igkey => {
        return (<li key={igkey}>
            <span>{igkey}</span>:{this.props.ingredients[igkey]}
        </li>);
    });
    return(
        <Aux>
        <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsummary}
            </ul>
    <strong>TOTAL PRICE:{this.props.price.toFixed(2)}</strong>
            <p>Continue to Checkout?</p>
            <Button clicked={this.props.purchaseno} btntyp="Danger">CANCEL</Button>
            <Button clicked={this.props.purchaseyes} btntyp="Success">CONTINUE</Button>
            </Aux>
        
    );}

};
export default Ordersummary;