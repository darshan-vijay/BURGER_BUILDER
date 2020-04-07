import React from 'react';
import BuildControl from './BuildControl'
import classes from './BuildControls.module.css'

const controls =[
    { label: 'Salad', type:'Salad'},
    { label: 'Bacon', type: 'Bacon' },
    { label: 'Cheese', type: 'Cheese' },
    { label: 'Meat', type: 'Meat' }
];


const BuildControls = (props)=>{
    return(<div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl =>(<BuildControl added={()=>props.ingredientadded(ctrl.type)} 
                                            subbed={()=>props.ingredientsubtracted(ctrl.type)} 
                                            key ={ctrl.label} 
                                            label ={ctrl.label}
                                            disabled={props.disabled[ctrl.type]} />
                                            ))}


        <button disabled={!props.purchasable} 
        onClick={props.ordered} 
        className={classes.OrderButton}>{props.isAuthenticated?'ORDER NOW' :'SIGNUP TO CONTINUE'}</button>

    </div>);

}
export default BuildControls;