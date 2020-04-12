import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import classes from './App.module.scss';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Footer from './components/Navigation/Footer/Footer';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Logout/Logout';
import { connect } from 'react-redux';
import { authCheckState } from './store/actions/index';

class App extends React.Component{

  componentDidMount(){
    this.props.onTryAutoSignUp();
  }
  
  render(){
    return (
      <div className={classes.App}>
        <Layout>
          <Switch>
            <Route path='/checkout' component={Checkout} />
            <Route path='/orders' component={Orders} />
            <Route path='/auth' component={Auth} />
            <Route path='/logout' component={Logout} />
            <Route path='/' exact component={BurgerBuilder} />
          </Switch>
        </Layout>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(authCheckState())
  }
};
export default withRouter(connect(null, mapDispatchToProps)(App));
