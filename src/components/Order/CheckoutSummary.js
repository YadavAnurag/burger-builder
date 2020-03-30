import React from 'react';

import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import './CheckoutSummary.css';


const CheckoutSummary = (props) => {
  return (
    <div className='CheckoutSummary'>
      <h1>We hope it taste well!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients} />
      </div>
      <div className='centerDiv'>
        <Button btnType={'Danger'} clicked={props.checkoutCancelled}>Cancel</Button>
        <Button btnType={'Success'} clicked={props.checkoutContinued} >Continue</Button>
      </div>
    </div>
  );
}

export default CheckoutSummary;