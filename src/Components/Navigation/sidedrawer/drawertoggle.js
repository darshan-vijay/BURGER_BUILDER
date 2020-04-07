import React from 'react';
import classes from './drawertoggle.module.css'

const drawertoggle =(props)=>(
    
    <div className={classes.DrawerToggle}  onClick={props.drawclicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawertoggle;