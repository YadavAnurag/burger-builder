import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as checkoutActions from '../../store/actions/index';

class Checkout extends React.Component{

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }
  checkoutContinuedHandler = () => {
    this.props.history.push('/checkout/contact-data');
  }

  render(){
    let summary = <Redirect to='/' />;
    if(this.props.ings){
      summary = (
        <div>
          {this.props.purchased && <Redirect to='/' />}
          <CheckoutSummary 
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler} />
          <Route 
            path={this.props.match.url + '/contact-data'} 
            component={ContactData}
          />
        </div>
      );
    }
    return {...summary}; 
  }
}


const mapStateToProps = (state) => {
  console.log(state.burgerBuilder);
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
};
const mapDispatchToProps = (dispatch) => ({
  onInitPurchase: () => dispatch(checkoutActions.purchaseInit())
});
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);