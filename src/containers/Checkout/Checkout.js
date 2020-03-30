import React from 'react';
import queryString from 'query-string';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary';
//import ContactData from './ContactData/ContactData';
///import ContactData from './ContactData/ContactData';


class Checkout extends React.Component{
  state = {
    ingredients: {salad: 1, cheese: 1, bacon: 1, meat: 1}
  }

  componentDidMount(){
    const query = queryString.parse(this.props.location.search);
    let ingredients = [];
    for(let param of Object.entries(query)){
      ingredients[param[0]] = +param[1];
    }
    this.setState({ingredients});
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }
  checkoutContinuedHandler = () => {
    this.props.history.push('/checkout/contact-data');
  }

  render(){
    return (
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
      </div>
    );
  }
}

export default Checkout;