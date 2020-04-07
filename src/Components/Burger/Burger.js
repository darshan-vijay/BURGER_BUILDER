import React from 'react';

import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient.js/BurgerIngredients';
const Burger =(props)=>{

    let transingredients= Object.keys(props.ingredients).map(igkey =>{ return [...Array(props.ingredients[igkey])
    ].map((_,i)=>{return (<BurgerIngredient key ={igkey+i} type ={igkey}/>);
})}).reduce((ele,el)=>{return ele.concat(el)},[]);

if(transingredients.length === 0){
    transingredients= <p>Please start Adding ingredients</p>
}

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="Bread-top" />
            {transingredients}
            <BurgerIngredient type="Bread-Bottom" />
     
        </div>
    );


}
export default Burger;