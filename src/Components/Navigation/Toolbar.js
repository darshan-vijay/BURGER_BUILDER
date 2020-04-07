import React from 'react';
import Logo from '../Logo'
import DrawerToggle from'../Navigation/sidedrawer/drawertoggle'
import classes from './Toolbar.module.css';
import NavigationItems from './NavigationITems/NavigationItems';
const Toolbar = (props) =>{ return( <header className={classes.Toolbar}>
        <DrawerToggle drawclicked={props.clicked} />
    <div className={classes.Logo}><Logo /></div>
        
        <nav className={classes.DesktopOnly}>
         <NavigationItems isAuthenticated={props.isAuth} />      
        </nav>
    </header>);
}
export default Toolbar;