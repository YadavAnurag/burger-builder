import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

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

    let routes = null;
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      );
    }else{
      routes = (
        <Switch>
          <Route path='/auth' exact component={Auth} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      );
    }

    return (
      <div className={classes.App}>
        <Layout>
          {routes}
        </Layout>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(authCheckState())
  }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
