import React from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import CheckoutSummary from './container/Checkout/Checkout';

function App() {
  return (
    <div className="App">
      <Layout>
        <BurgerBuilder />
        <CheckoutSummary />
      </Layout>
    </div>
  );
}

export default App;
