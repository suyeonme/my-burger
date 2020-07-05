import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = props => {

    const ingredientsSummary = Object.keys(props.ingredients)
        .map(ingKey => { 
            return (
                <li key={ingKey}>
                    <span style={{textTransform: 'capitalize'}}>{ingKey}:</span> {props.ingredients[ingKey]}
                </li>
            );
    });

    return (
        <>
            <h3>Your Order</h3>
            <p>A delicious Burger with the follwing ingredients</p>
            <ul>
                { ingredientsSummary }
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}$</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.cancelPurchasing}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continuePurchasing}>CONTINUE</Button>
        </>
    );
};

export default orderSummary;