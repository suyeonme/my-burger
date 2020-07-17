import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import Orders from './container/Orders/Orders';
import Auth from './container/Auth/Auth';
import Logout from './container/Auth/Logout/Logout';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoLogin();
  };

  render () {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} /> 
        <Route path="/" component={BurgerBuilder} exact />
        <Redirect to="/" /> 
      </Switch>
    );
  // When type unkown path, redirect to the root. like '/orders'
  

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
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
