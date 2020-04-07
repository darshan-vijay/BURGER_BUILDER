import React from 'react';
import classses from './input.module.css'


const input =(props)=>{
 let inputElement=null;
 const inputClasses =[classses.InputElement];
 if(props.invalid && props.shouldvalidate && props.touched){
     inputClasses.push(classses.Invalid)
 }
 switch(props.elementType){
     default:
         inputElement=<input onChange={props.Changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>;
         break;
     case('select'):
         inputElement = <select onChange={props.Changed}className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} >
{props.elementConfig.options.map(option=>(
    <option key={option.value} value={option.value}>{option.displayValue}</option>
)
)}
</select>
     break;
     case('textarea'):
     inputElement=<textarea onChange={props.Changed}className={classses.InputElement} {...props.elementConfig} value={props.value}/>
     break;
 }
    return( 
        <div className={classses.Input}> 
            <label className={classses.Label}>{props.label}</label>
           {inputElement}
        </div>
    );

}
export default input;