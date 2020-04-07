import React,{Component} from 'react';
import Order from './Order'

import * as actions from '../../store/actions/index'
import {connect} from 'react-redux'
import Spinner from '../../Components/UI/spinner'


class Orders extends Component{
    componentDidMount() {
        this.props.onFetchOrders(this.props.token,this.props.userId);
    }

    render(){
        let orders=<Spinner />;
        if(!this.props.loading){
           orders= this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ))
        }

        return(
            <div>
              {orders}                
            </div>
        );
    }
    
}

const mapStatetoProps = state => {
    return {
       orders: state.order.orders,
       loading:state.order.loading,
       token:state.auth.token,
       userId:state.auth.userId
    }
}
const mapDispatchtoProps =dispatch =>{
    return{
        onFetchOrders :(token,userId)=> dispatch(actions.fetchedOrders(token,userId))
    }
}


export default connect(mapStatetoProps,mapDispatchtoProps)(Orders);