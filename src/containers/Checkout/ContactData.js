        import React,{Component} from 'react';
        import Button from '../../Components/UI/Button'
        import classes from './ContactData.module.css'
        import axios from '../../axios-orders';
        import Spinner from '../../Components/UI/spinner'
        import {withRouter} from 'react-router-dom'
        import Input from '../../Components/UI/input'
        import {connect} from 'react-redux'
        import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import * as actions from "../../store/actions/index"


        class ContactData extends Component{
            state={
            orderForm:{
                     name: {
                        elementType: "input",
                    elementConfig:{
                        type:"text",
                        placeholder:'Your Name'
                    },
                value:'',
                validation:{required:true},valid:false,touched:false
            },
                    
            street:  {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: 'Street Name'
                },
                value: '',
                validation: { required: true }, valid: false, touched: false},

            ZipCode:{
                    elementType: "input",
                    elementConfig: {
                        type: "text",
                        placeholder: 'Zip Code'
                    },
                value: '',
                validation: { required: true,
                    minlength: 5, maxlength: 10
                }, valid: false, touched: false
                },
                Country:  {
                        elementType: "input",
                        elementConfig: {
                            type: "text",
                            placeholder: 'Country'
                        },
                    value: '',
                    validation: { required: true }
                    },
                    email:  {
                            elementType: "input",
                            elementConfig: {
                                type: "email",
                                placeholder: 'Your Mail'
                            },
                        value: '',
                        validation: { required: true }, valid: false, touched: false
                        },
                        deliveryMethod:  {
                                elementType: "select",
                                elementConfig: {
                                    options:[{value:'fastuh',displayValue:"Faster"},
                                        { value: 'slowuh', displayValue: "slower" }]
                                },
                            value: 'fastuh',
                            validation: true,
                            valid:true
                            }},
        
                formisvalid: false
             
            }

        checkValidity=(value,rules)=>{
            let isValid = true;
            if(rules.required) {
                isValid=value.trim() !=='' && isValid;
            }
            if (rules.minlength) {
                isValid = value.length >= rules.minlength &&isValid;
            }
            if (rules.maxlength) {
                isValid = value.length <= rules.maxlength  &&isValid;
            }
            return isValid;
        }



            inputChanged =(event,inputIdentifier)=>{
            const updatedorderform ={...this.state.orderForm}  ; 
                const updatedorderformalready= { ...updatedorderform[inputIdentifier]};
                updatedorderformalready.value = event.target.value;
                updatedorderformalready.touched= true;
                updatedorderformalready.valid= this.checkValidity(updatedorderformalready.value,updatedorderformalready.validation)
                updatedorderform[inputIdentifier]=updatedorderformalready;
                let formisvalid=true;
                for(let inputfiers  in updatedorderform)
                {
                    formisvalid = updatedorderform[inputfiers].valid &&formisvalid;
                }
                this.setState({orderForm : updatedorderform,formisvalid:formisvalid});

            }
            orderhandler=(event)=>{
                event.preventDefault();
               
                const formdata={};
            for( let formelementidn in this.state.orderForm){
                formdata[formelementidn] = this.state.orderForm[formelementidn].value;
            }

                const order = {
                    ingredients: this.props.ings,
                    price: this.props.price,
                    orderdata: formdata,
                    userId:this.props.userId
                }
                this.props.onOrderBurger(order,this.props.token);

            }
            render()
            {
                const formelementarray=[];
                for(let key in this.state.orderForm){
                    formelementarray.push({
                        id:key,
                        config:this.state.orderForm[key]
                    });
                }
                let form = (<form onSubmit={this.orderhandler}>
                    
                    {
                        formelementarray.map(formelement=>(
                            <Input 
                            Changed={(event)=>this.inputChanged(event,formelement.id)}
                            key ={formelement.id}
                            elementType={formelement.config.elementType}
                            elementConfig={formelement.config.elementConfig}
                            value={formelement.config.value}
                            invalid={!formelement.config.valid}
                            shouldvalidate={formelement.config.validation}
                            touched={formelement.config.touched} />

                        ))
                    }
                    <Button btntyp="Success" disabled={!this.state.formisvalid} >ORDER</Button></form>);
                if(this.props.loading){
                    form = <Spinner />;
                }
                return(<div className={classes.ContactData}>
                    <h4>Enter contact Data!</h4>
                    
                    {form}
                
                </div>);
            }
        }
        const mapStateToProps = state => {
          return {
              ings: state.burgerBuilder.ingredients,
              price: state.burgerBuilder.totalPrice,
            loading: state.order.loading,
            token: state.auth.token,
            userId:state.auth.userId
          };
        };
const mapDispatchToProps = (dispatch) => {
    return{
 onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    }
}
        
        export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler( withRouter(ContactData),axios));