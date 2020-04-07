import React, { Component } from 'react';
import {Route,Switch,withRouter, Redirect} from 'react-router-dom'
import BurgerBuilder from './containers/BurgerBuilder/Burgerbuilder'
import Layout from './Components/Layout/Layout'
import Logout from './containers/Auth/logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/AsyncComponent'
import {connect} from 'react-redux'

const asyncCheckout = asyncComponent(()=>{
  return import('./containers/Checkout/Checkout');
})

const asyncOrders = asyncComponent(() => {
  return import('./containers/Checkout/Orders');
})
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
})


class App extends Component {
 

  componentDidMount(){
    this.props.ontrysignup();
  }
  render(){
    let route = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/"  />
      </Switch>
      
 );

    if (this.props.isAuthenticated) {
      route = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      );
    }



  return (
    <div>
      <Layout>
       {route}
      </Layout>
    </div>
  );
}}
const mapStateToProps = state =>{
  return{
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ontrysignup:() => dispatch(actions.authCheckState()),

  }

};

export default withRouter( connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
