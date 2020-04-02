import React from 'react';
import queryString from 'query-string';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component{
  state = {
    ingredients: null,
    totalPrice: 0
  }

  UNSAFE_componentWillMount(){
    const query = queryString.parse(this.props.location.search);
    let ingredients = {};
    let price = 0;
    for(let param of Object.entries(query)){
      if(param[0] === 'price'){
        price = param[1];
      }else{
        ingredients[param[0]] = +param[1];
      }
    }
  
    this.setState({ingredients, totalPrice: price});
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
          checkoutContinued={this.checkoutContinuedHandler} />
        <Route 
          path={this.props.match.url + '/contact-data'} 
          render={(props) => (
            <ContactData 
              ingredients={this.state.ingredients} 
              price={this.state.totalPrice}
              {...props} 
            />
          )} />
      </div>
    );
  }
}

export default Checkout;