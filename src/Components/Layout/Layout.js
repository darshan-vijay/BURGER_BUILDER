import React,{Component} from 'react'
import SideDrawer from '../../Components/Navigation/sidedrawer/sidedrawer'
import Aux from '../../hoc/Auxillary'
import Toolbar from '../Navigation/Toolbar'
import classes from './Layout.module.css'
import {connect} from 'react-redux'
class layout extends Component{

    state = { showside: false }
    SideDrawerClosed =()=>{
        this.setState({showside: false})
      
    }
   
    
    sidedraweToggle =()=>{
        this.setState((prevState)=>{return ({showside: !this.state.showside}); });
    }
    render(){
       


    return (
        <Aux>
            
            <Toolbar 
            isAuth ={this.props.isAuthenticated}
            clicked={this.sidedraweToggle} />
            <SideDrawer 
            isAuth={this.props.isAuthenticated}
            open ={this.state.showside}
            closed={this.SideDrawerClosed}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
    );
    }

}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !==null
    };

};




export default connect(mapStateToProps)(layout);