import React, { Component } from 'react';
import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            meat: 0,
            bacon: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

    updatePurchaseState = (ingredients) => {

        // Get total price of ingredients
        const sum = Object.keys(ingredients)
            // Return each value of ingredients and get sum
            .map(ingKey => { return ingredients[ingKey]; }) 
            .reduce((sum, el) => { return sum + el }, 0);
        
        // Return TRUE (sum > 0)
        this.setState({purchasable: sum > 0 }); 
    };


    addIngredientHandler = (type) => {
        // Update count 
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;

        // Update price 
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        // Assign updated count and price to state
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });

        // Enable button when adding ingredient
        this.updatePurchaseState(updatedIngredients);
    };


    removeIngredientHandler = (type) => {
        // Update count 
        const oldCount = this.state.ingredients[type];

        // Prevent to add nagative count
        if (oldCount <= 0) return;

        const updatedCount = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;

        // Update price 
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        // Assign updated count and price to state
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });

        // Enable button when adding ingredient
        this.updatePurchaseState(updatedIngredients);
    };

    purchasingHandler = () => {
        this.setState({ purchasing: true });
    };

    cancelPurchasingHandler = () => {
        this.setState({ purchasing: false });
    }

    continuePurchasingHandler = () => {
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice
        };

        axios.post('/orders.json', order);
    }


    render() {

        return (
            <>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchasingHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients} 
                        cancelPurchasing={this.cancelPurchasingHandler}
                        continuePurchasing={this.continuePurchasingHandler}
                        price={this.state.totalPrice} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemovded={this.removeIngredientHandler}
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchasingHandler} />
            </>
        );
    }
};

export default BurgerBuilder;