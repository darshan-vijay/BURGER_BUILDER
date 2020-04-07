import React,{Component}from 'react';
import Button from '../../Components/UI/Button'
import Input from '../../Components/UI/input'
import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'
import {connect} from 'react-redux'
import Spinner from '../../Components/UI/spinner'
import {Redirect} from 'react-router-dom'

class Auth extends Component{

componentDidMount(){
if(!this.props.Building && this.props.authRedirectPath!=='/')
{
this.props.onSetAuthRedirectPath();
}
}





state={
    controls:{
        email: {
            elementType: "input",
            elementConfig: {
                type: "email",
                placeholder: 'Mail Address'
            },
            value: '',
            validation: { 
                required: true,
              
            },
             valid: false,
             touched: false
        },
        password: {
            elementType: "input",
            elementConfig: {
                type: "password",
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength:6
            },
            valid: false,
            touched: false
        },
       
    },
    isSignup: true
}
 submitHandler = (event) =>{
     event.preventDefault();
     this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value,this.state.isSignup)
 }







    inputChanged = (event, controlName) => {
        const updateControls = {
             ...this.state.controls };
        const updateControlsalready = { ...updateControls[controlName] };
        updateControlsalready.value = event.target.value;
        updateControlsalready.touched = true;
        updateControlsalready.valid = this.checkValidity(updateControlsalready.value, updateControlsalready.validation)
        updateControls[controlName] = updateControlsalready;
        let formisvalid = true;
        for (let inputfiers in updateControls) {
            formisvalid = updateControls[inputfiers].valid && formisvalid;
        }
        this.setState({ controls: updateControls, formisvalid: formisvalid });

    }
    switchModeHandler =()=>{
        this.setState(prevState =>{
            return {isSignup: !prevState.isSignup}
        })
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minlength) {
            isValid = value.length >= rules.minlength && isValid;
        }
        if (rules.maxlength) {
            isValid = value.length <= rules.maxlength && isValid;
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }
        return isValid;
    }
   
    render()
    {
        const formelementarray = [];
        for (let key in this.state.controls) {
            formelementarray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = formelementarray.map(formelement =>(
            <Input

                Changed={(event) => this.inputChanged(event, formelement.id)}
                key={formelement.id}
                elementType={formelement.config.elementType}
                elementConfig={formelement.config.elementConfig}
                value={formelement.config.value}
                invalid={!formelement.config.valid}
                shouldvalidate={formelement.config.validation}
                touched={formelement.config.touched} />
                
        ));
        if(this.props.loading){
            form =<Spinner />
        }
        let errorMessage =null;

        if(this.props.error){
            errorMessage =(
                <p>{this.props.error.message}</p>
            );
        }
        let Authredirect = null;
        if(this.props.isAuthenticated){
            Authredirect =<Redirect to={this.props.authRedirectPath} />
        }



        return( 
            <div className={classes.Auth}>
                {Authredirect}
                {errorMessage}
                <form onSubmit={this.submitHandler} >
                    <h1 style={{ color:'rgba(44, 146, 40, 0.74)',textAlign:'center'}}>{!this.state.isSignup ? 'WELCOME!!! SIGNIN' : 'HELLO THERE!!! SIGN UP!!'}</h1>
                    {form}
                    <Button btntyp="Success">SUBMIT</Button>
                </form>
            <Button clicked={this.switchModeHandler} btntyp="Danger">SWITCH TO {this.state.isSignup?'SIGNIN':'SIGNUP'}</Button>
            </div>

        );
    }
}


const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated : state.auth.token !==null,
        Building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirect
       

    };

};


const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password,isSignup) => dispatch(actions.auth(email,password,isSignup)),
        onSetAuthRedirectPath:()=>dispatch(actions.setAuthRedirect('/'))
    }

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);
