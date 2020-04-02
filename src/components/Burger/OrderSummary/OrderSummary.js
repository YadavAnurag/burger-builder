import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.module.scss';


class OrderSummary extends React.Component {

  UNSAFE_componentWillUpdate(){
    console.log('[OrderSummary] will update');
  }

  render(){
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => (
        <li key={igKey}>
          <span
            style={{textTransform: "capitalize"}} >{igKey}
          </span>: {this.props.ingredients[igKey]}
        </li>
      ));

    return (
      <Auxiliary>
        <div className={classes.OrderSummary}>
          <h3>Your Order</h3>
          <p>A delicious burger with the following ingredients...</p>
          <ul>
            {ingredientSummary}
          </ul>
          <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
          <p>Continue to Checkout? </p>
          <div className={classes.centerDiv}>
            <Button btnType={'Danger'} clicked={this.props.cancelPurchase}>Cancel</Button>
            <Button btnType={'Success'} clicked={this.props.continuePurchase} >Continue</Button>
          </div>
        </div>
      </Auxiliary>
    );
  }
};

export default OrderSummary;