import React from 'react';
import BurgerLogo from '../../Logo'
import Backdrop from '../../UI/Backdrop'
import NavigationItems from '../NavigationITems/NavigationItems';
import classes from './sideDrawer.module.css'
import Aux from '../../../hoc/Auxillary'

const sideDrawer =(props)=>{
    let attachedClasses =[classes.SideDrawer,classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer,classes.Open];
    }

    return(
        <Aux>
        <Backdrop show ={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
            <div className={classes.Logo}>
                <BurgerLogo />
            </div>
           
            <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>

        </div>
        </Aux>

    );
}
export default sideDrawer;