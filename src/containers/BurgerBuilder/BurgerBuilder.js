import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './BurgerBuilder.module.scss';
import axios from '../../axios-orders'; 


const INGREDIENT_PRICES = {salad: 0.5, cheese: 0.4, meat: 1.3, bacon: 0.7};

class BurgerBuilder extends Component{
  state = {
    ingredients: {
      salad: 0, cheese: 0, bacon: 0, meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  };


  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el)=> sum + el, 0);
    
    this.setState({purchasable: sum > 0});
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    if(oldCount <= 0){
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCount;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  };

  purchasingHandler = () => {
    this.setState({purchasing: true});
  };
  purchasingCancelHandler = () => {
    this.setState({purchasing: false});
  };
  purchasingContinueHandler = () => {
    //alert('you continue');
    this.setState({loading: true});

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice, // never send price to server, always calculate price on server
      customer: {
        name: 'Anu',
        email: 'anu@gmail.com',
        address: {
          street: 'Sakrawal EAST',
          pinCode: '224190',
          state: 'Uttar Pradesh'
        }
      },
      deliveryMethod: 'fastest'
    };
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false, purchasing: false});
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false, purchasing: false});
      });
  }

  render(){

    const disabledInfo = {
      ...this.state.ingredients
    };
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = <Spinner />;
    if(this.state.loading === false){
      orderSummary = <OrderSummary 
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        cancelPurchase={this.purchasingCancelHandler}
        continuePurchase={this.purchasingContinueHandler}
        />;
    };

    return (
      <Auxiliary>
        <Modal show={this.state.purchasing} loading={this.state.loading} closeModal={this.purchasingCancelHandler}>
          {orderSummary}
        </Modal>
        <div className={classes.BurgerBuilder}>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls 
            addIngredient={this.addIngredientHandler} 
            removeIngredient={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordered={this.purchasingHandler}
          />
        </div>
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;