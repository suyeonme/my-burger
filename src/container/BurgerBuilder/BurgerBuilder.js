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

import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    };

    componentDidMount () {
        this.props.onFetchIngredients();
    };

    updatePurchaseState = price => price > 0;

    purchasingHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onAuthRedirectPath('/checkout');
            this.props.history.push('/auth'); 
        }
    };

    cancelPurchasingHandler = () => {
        this.setState({ purchasing: false });
    }

    continuePurchasingHandler = () => {
        this.props.onInitPurchase();
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
                        ordered={this.purchasingHandler}
                        isAuth={this.props.isAuthenticated} />
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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }; 
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onFetchIngredients: () => dispatch(actions.fetchIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));