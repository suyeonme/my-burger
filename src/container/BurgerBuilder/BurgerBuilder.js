import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
        totalPrice: 4
    };

    addIngredientHandler = type => {

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
    };

    removeIngredientHandler = type => {

    };

    render() {
        return (
            <>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredientAdded={this.addIngredientHandler} />
            </>
        );
    }
};

export default BurgerBuilder;