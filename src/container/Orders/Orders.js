import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchHandler(this.props.token);
    };

    render() {
        let orders = <Spinner />
        
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order 
                    ingredients={order.ingredients}
                    price={order.price}
                    key={order.id} />
            ));
        };
        return (
            <div>
                { orders }
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchHandler: (token) => dispatch(actions.fetchOrders(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));