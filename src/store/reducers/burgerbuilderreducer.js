import * as actionTypes from '../actions/actions'
import { updateObject } from '../utility'

const initialstate = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};
const INGREDIENTS_PRICE = {
  Salad: 0.5,
  Bacon: 0.6,
  Cheese: 0.4,
  Meat: 1
};
const reducer =(state = initialstate,action)=>{
    switch (action.type) {
      case actionTypes.ADD_INGREDIENT:
        const updatedIngredients = updateObject(state.ingredients,{ [action.ingredientName]:
          state.ingredients[action.ingredientName] + 1});
          const updatedState={
            ingredients: updatedIngredients,
            building:true,
            totalPrice:
              state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            
          }
        return updateObject(state,updatedState)
      case actionTypes.REMOVE_INGREDIENT:
        return {
            ...state,
            ingredients:{
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName]-1
            },building:true,
            totalPrice:state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
        };
        case actionTypes.SET_INGREDIENTS:
          return{
            ...state, 
            ingredients:{Salad: action.ingredients.Salad,
            Bacon:action.ingredients.Bacon,
          Cheese:action.ingredients.Cheese,
        Meat:action.ingredients.Meat},
        totalPrice:4,
            error:false,
            building: false

          };
      case actionTypes.FETCH_INGREDIENTS_FAILED:
        return {
          ...state,
          error: true

        };
        default:
            return state; 
        }

};

export default reducer;