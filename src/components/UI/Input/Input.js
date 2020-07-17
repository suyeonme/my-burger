import React from 'react';
import classes from './Input.module.css';

const input = props => {
    let inputElement = null;

    // Apply invalid class
    const inputClasses = [classes.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) inputClasses.push(classes.Invalid);

    // Render invalid message
    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p>Please enter a valid value!</p>;
    };

    // Check input type 
    switch(props.elementType) {
        case('input'):
                inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}
                autoComplete="off" />;
            break;
        case('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>;
            break;
        case('select'):
            inputElement = (
                <select 
                    className={inputClasses.join(' ')} 
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option value={option.value} key={option.value}>{ option.displayValue }</option>
                    ))}
                </select>
            ); 
        break;
        default:
            inputElement = <input 
                className={classes.InputElement} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>;
    };

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
};

export default input;