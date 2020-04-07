import React,{ Component } from "react";
import CheckoutSummary from '../../Components/checkoutsummary'
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData'
import {connect} from 'react-redux'



class Checkout extends Component{
   
    // componentWillMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients={};
    //     let price={};
    //     for(let param of query.entries()){
    //         if(param[0] === 'price')
    //         {
    //             price = +param[1];
    //         }
    //         else{
    //             ingredients[param[0]] = +param[1];
    //         }
           
    //     }
    //     this.setState({ ingredients: ingredients, totalPrice: price })
    // }
    cancelled=()=>{
        this.props.history.goBack();
    }
    continued = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        let summary = <Redirect to='/' />;
        
        if(this.props.ings)
        {
            const purchasedRedirect = this.props.purchased? <Redirect to='/' />:null;
           summary = (<div>
                {purchasedRedirect}<CheckoutSummary checkoutcancelled={this.cancelled} checkoutcontinued={this.continued} 
                ingredients={this.props.ings} />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} /></div>);
        }

        return (summary);

}
}



const mapStateToProps = state => {
  return {
      ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased

  };
};



export default connect(mapStateToProps)(Checkout);