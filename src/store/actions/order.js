import * as actionTypes from './actions';
import axios from '../../axios-orders';


export const purchaseBurgerSuccess=(id,orderData)=>{
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderid:id,
        orderData:orderData

    }
}
export const purchaseBurgerFail= (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error:error

    }
}

export const purchaseBurgerStart =()=>{
    return {
        type:actionTypes.PURCHASE_BURGER_START

    }
}

export const purchaseBurger = (OrderData,token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token, OrderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name,OrderData))
               
            }).catch(
                error =>{
                    dispatch(purchaseBurgerFail(error))

                }
            )

    }
}
export const purchaseinit =()=>{
    return {
        type: actionTypes.PURCHASE_INIT
    }

}
export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders

    }
}
export const fetchOrderfailure = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILURE,
       error:error
    }
}
export const fetchOrderstart = (OrderData) => {
    return  {
        type: actionTypes.FETCH_ORDERS_START
        
    }
}
export const fetchedOrders = (token,userId) => {
    return dispatch => {
        dispatch(fetchOrderstart());
        const queryparams = '?auth='+ token +'&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/orders.json'+queryparams)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push(
                        { ...res.data[key], id: key }
                    );
                }
                dispatch(fetchOrderSuccess(fetchedOrders));})
              .catch(err =>{
                  
                  dispatch(fetchOrderfailure(err));
              })
 
    }
}
