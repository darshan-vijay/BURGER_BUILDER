import React, { Component } from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Aux from '../../hoc/Auxillary';
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal'
import Ordersummary from '../../Components/Burger/BuildControls/Ordersummary/ordersummary';
import axios from '../../axios-orders'
import Spinner from '../../Components/UI/spinner'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'


class BurgerBuilder extends Component{
    state ={
        purchased: false,
        purchasable:false,
        loading:false 
    }
    componentDidMount(){
        this.props.onInitIngredients();
       
    }
    updatePurchaseHandler(ingredients) {
        
        const sum = Object.keys(ingredients).map(igkey => {
            return ingredients[igkey];
        }).reduce((sum, el) => { return sum + el }, 0);
       return sum > 0
    }
    // addIngredientHandler = (type) =>{
    //     const oldCount = this.props.ings[type];
    //     const oldPrice = this.props.price;
    //     const pricetobeadded = INGREDIENTS_PRICE[type];
    //     const updatedprice =oldPrice+pricetobeadded;
    //     const updatedcount = oldCount + 1;
    //     const updatedingredients = {...this.props.ings}
    //     updatedingredients[type]=updatedcount;
    //     this.setState({ingredients:updatedingredients,totalPrice:updatedprice})
    //     this.updatePurchaseHandler(updatedingredients);
    // }
    
    // deleteIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     if(oldCount<=0)
    //     {
    //         return;
    //     }
    //     const oldPrice = this.props.price;
    //     const pricetobesub= INGREDIENTS_PRICE[type];
    //     const updatedprice = oldPrice - pricetobesub;
    //     const updatedcount = oldCount -1;
    //     const updatedingredients = { ...this.props.ings }
    //     updatedingredients[type] = updatedcount;
    //     this.setState({ ingredients: updatedingredients, totalPrice: updatedprice })
    //     this.updatePurchaseHandler(updatedingredients);


    // }
    purchaseHandler =()=>{
        if(this.props.isAuthenticated){
            this.setState({
                purchased: true
            });
        }
        else{
            this.props.onSetRedirect('/checkout');
            this.props.history.push('/auth')
        }
        
    }
    purchasecancelHandler = () => {
        this.setState({
            purchased: false
        });
    }
    purchasecontinueHandler = () => {
        this.props.onInitPurchased();
        this.props.history.push('/checkout');
        // const queryParams=[];
        // for(let i in this.props.ings){
        //     queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.props.ings[i]))
        // }
        // queryParams.push('price='+ this.props.price);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname:'checkout',
        //     search:'?' + queryString
        // });
    }


     
       

                
    render()
    { let diabledinfo ={...this.props.ings};
       
    for(let key in diabledinfo)
    {
        diabledinfo[key]=diabledinfo[key] <= 0;
    }
       
let ordersummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;


    if(this.props.ings){
        burger = (
        <Aux>
        <Burger ingredients={this.props.ings} />
            <BuildControls ordered={this.purchaseHandler}
                purchasable={this.updatePurchaseHandler(this.props.ings)}
                price={this.props.price}
                isAuthenticated={this.props.isAuthenticated}
                ingredientadded={this.props.onIngredientAdded}
                ingredientsubtracted={this.props.onIngredientRemoved} disabled={diabledinfo} />
            </Aux>  );
        ordersummary = (<Ordersummary price={this.props.price} purchaseyes={this.purchasecontinueHandler}
            purchaseno={this.purchasecancelHandler}
            ingredients={this.props.ings} />);}

        if (this.state.loading) {
            ordersummary = (<Spinner />);

        }
        return( 
            <Aux>
               
                <Modal show={this.state.purchased} modalClosed={this.purchasecancelHandler} >
                    {ordersummary}
                </Modal>
                {burger}
                
            </Aux>

        ); 
    }
}
const mapStateToProps = state=> {
    return{
        ings:state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null

  };

};
const mapDispatchToProps =dispatch=>{
    return{
        onIngredientAdded: (ingName)=>dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients:()=> dispatch(actions.initIngredients()),
        onInitPurchased:()=>dispatch(actions.purchaseinit()),
        onSetRedirect:(path)=>dispatch(actions.setAuthRedirect(path))
    }

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));