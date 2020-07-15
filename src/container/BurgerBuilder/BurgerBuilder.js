import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import * as actionType from '../../store/actions/actionTypes';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

import * as burgerBuilderActions from '../../store/actions/index';


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    };

    componentDidMount () {
        this.props.onFetchIngredients();
    };

    updatePurchaseState = price => price > 0;

    purchasingHandler = () => {
        this.setState({ purchasing: true });
    };

    cancelPurchasingHandler = () => {
        this.setState({ purchasing: false });
    }

    continuePurchasingHandler = () => {
        this.props.history.push('/checkout');
    };


    render() {

        // Render spinner on UI while fetching data from server
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;


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
                        purchasable={this.updatePurchaseState(this.props.price)}
                        ordered={this.purchasingHandler} />
                </>
            );

            orderSummary =  <OrderSummary 
                ingredients={this.props.ings} 
                cancelPurchasing={this.cancelPurchasingHandler}
                continuePurchasing={this.continuePurchasingHandler}
                price={this.props.price} />;
        };

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
        price: state.totalPrice,
        error: state.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onFetchIngredients: () => dispatch(burgerBuilderActions.fetchIngredients())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));