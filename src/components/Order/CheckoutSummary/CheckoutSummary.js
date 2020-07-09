import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.module.css';

const checkoutSummary = props => {
    return (
        <div className={classes.checkoutSummary}>
            <h1>We hope it will taste well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />                
            </div>
            <button 
                btnType="Danger"
                clickded >CANCEL</button>
            <button 
                btnType="Success"
                clicked >CONTINUE</button>
        </div>

    );
};

export default checkoutSummary;