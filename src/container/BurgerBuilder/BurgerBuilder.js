import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actionType from '../../store/actions';
import axios from '../../axios-orders';


class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount () {
/*         axios.get('Ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {
            this.setState({ error: true });
        }) */
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

    purchasingHandler = () => {
        this.setState({ purchasing: true });
    };

    cancelPurchasingHandler = () => {
        this.setState({ purchasing: false });
    }

    continuePurchasingHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i])); // property name = value of property name [bacon=0&cheese=1&meat=1&salad=2]
        };
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString                                 // ' http://localhost:3000/checkout?bacon=0&cheese=1&meat=1&salad=2 '
        });
    };


    render() {

        // Render spinner on UI while fetching data from server
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;


        // Render a burger when get data from server
        if (this.props.ings) {
            burger = (
                <>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded} 
                        ingredientRemovded={this.props.onIngredientRemoved}
                        ingredients={this.props.ings}
                        price={this.props.price}
                        purchasable={this.state.purchasable}
                        ordered={this.purchasingHandler} />
                </>
            );

            orderSummary =  <OrderSummary 
                ingredients={this.props.ings} 
                cancelPurchasing={this.cancelPurchasingHandler}
                continuePurchasing={this.continuePurchasingHandler}
                price={this.props.price} />;
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

// Redux 
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionType.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionType.DELETE_INGREDIENT, ingredientName: ingName})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));