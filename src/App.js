import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Logout from './container/Auth/Logout/Logout';

// Lazy loading which renders asynchronously
const asyncCheckout = asyncComponent(() => {
  return import('./container/Checkout/Checkout'); 
});

const asyncOrders = asyncComponent(() => {
  return import('./container/Orders/Orders'); 
});

const asyncAuth = asyncComponent(() => {
  return import('./container/Auth/Auth'); 
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoLogin();
  };

  render () {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} /> 
        <Route path="/" component={BurgerBuilder} exact />
        <Redirect to="/" /> 
      </Switch>
    );
  // When type unkown path, redirect to the root. like '/orders'
  // Guarding on frontend side for routes against unauthenticated user


    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} /> 
          <Route path="/" component={BurgerBuilder} exact />
          <Redirect to="/" /> 
      </Switch>
      );
    }

    return (
      <div className="App">
        <Layout>
          { routes }
        </Layout>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
