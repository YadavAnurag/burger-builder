import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import classes from './App.module.scss';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Footer from './components/Navigation/Footer/Footer';


function App() {
  return (
    <div className={classes.App}>
      <Layout>
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/' exact component={BurgerBuilder} />
        </Switch>
      </Layout>
      <Footer />
    </div>
  );
}

export default App;
