import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount () {
        axios.get('https://react-my-burger-e7355.firebaseio.com/orders/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {
            this.setState({ error: true});
        })
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
            price: this.state.totalPrice,
            customer: {
                name: 'Suyeon Kang',
                adress: {
                    city: 'Seoul',
                    zipCode: 58116,
                    country: 'Korea'
                },
                email: 'suyeon.dev@gmail.com'
            },
            deliveryMethod: 'fatest'
        };

        this.setState({ loading: true });

        axios.post('/orders.json', order)
        .then(response => {
            this.setState({ loading: false, purchasing: false });
        })
        .catch(error => {
            this.setState({ loading: false, purchasing: false });
        });
    };


    render() {

        // Render spinner on UI while fetching data from server
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;


        // Render a burger when get data from server
        if (this.state.ingredients) {
            burger = (
                <>
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

            orderSummary =  <OrderSummary 
                ingredients={this.state.ingredients} 
                cancelPurchasing={this.cancelPurchasingHandler}
                continuePurchasing={this.continuePurchasingHandler}
                price={this.state.totalPrice} />;
        };

        if(this.state.loading) orderSummary = <Spinner />

        return (
            <>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchasingHandler}>
                    { orderSummary }
                </Modal>
                {burger}
            </>
        );
    }
};

export default WithErrorHandler(BurgerBuilder, axios);