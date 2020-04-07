/* eslint-disable default-case */
import React,{Component} from 'react';
import classes from './BurgerIngredient.module.css';
import Proptypes from 'prop-types'

class  BurgerIngredient extends Component {
   
   render(){
      let ingredient = null;
    switch(this.props.type){
        case ('Bread-Bottom'):
            ingredient = <div className={classes.BreadBottom}></div>
            break;
        case ('Bread-top'):
            ingredient =( <div className={classes.BreadTop}>
                <div className={classes.Seeds1}></div>
                <div className={classes.Seeds2}></div>
            </div>);
            break;
        case ('Meat'):
            ingredient = <div className={classes.Meat}></div>
            break;
        case ('Salad'):
            ingredient = <div className={classes.Salad}></div>
            break;
        case ('Cheese'):
            ingredient = <div className={classes.Cheese}></div>
            break;
        case ('Bacon'):
            ingredient = <div className={classes.Bacon}></div>
            break;
    }
    return ingredient;
}};
BurgerIngredient.propTypes ={
 type: Proptypes.string.isRequired
};
export default BurgerIngredient;