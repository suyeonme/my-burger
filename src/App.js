import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" component={BurgerBuilder} exact />
          <Route path="/checkout" component={Checkout} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
