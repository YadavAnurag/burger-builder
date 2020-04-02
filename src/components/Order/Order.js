import React from 'react';

import './Order.scss';


const Order = (props) => {

  const ingredients = [];
  for(let ingredientName in props.ingredients){
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }
  const ingredientOutput = ingredients.map(ig => (
    <span key={ig.name}>
      {ig.name} ({ig.amount})
    </span>
  ));

  return (
    <div className='Order'>
      <div>Ingredients: <div className='Ingredients'>{ingredientOutput}</div></div>
      <p>Price: <strong>INR {props.price.toFixed(2)}</strong></p>
    </div>
  ); 
}

export default Order;