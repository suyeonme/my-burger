import React, { Component }from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    // For debugging. It could be functional component
    componentDidUpdate() {
        console.log('[OrderSummary.js] update');
    };
    
    render() {

        const ingredientsSummary = Object.keys(this.props.ingredients)
            .map(ingKey => { 
                return (
                    <li key={ingKey}>
                        <span style={{textTransform: 'capitalize'}}>{ingKey}:</span> {this.props.ingredients[ingKey]}
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
            <p><strong>Total Price: {this.props.price.toFixed(2)}$</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={this.props.cancelPurchasing}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.continuePurchasing}>CONTINUE</Button>
        </>
        )
    }
};

export default OrderSummary;