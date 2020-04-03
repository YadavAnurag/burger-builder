import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './BurgerBuilder.module.scss';
import axios from '../../axios-orders'; 
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {salad: 0.5, cheese: 0.4, meat: 1.3, bacon: 0.7};

class BurgerBuilder extends Component{
  state = {
    ingredients: null,
    totalPrice: 20,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount(){
    axios.get('ingredients.json')
      .then(response => this.setState({ingredients: response.data}))
      .catch(error => this.setState({error: true}));
  }

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
    const queryParams = [];
    for(let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  render(){

    const disabledInfo = {
      ...this.state.ingredients
    };
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded...!</p> : <Spinner />;
    if(this.state.ingredients){
      burger = (
        <Auxiliary>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls 
            addIngredient={this.addIngredientHandler} 
            removeIngredient={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordered={this.purchasingHandler}
          />
        </Auxiliary>
      );

      orderSummary = (
        <OrderSummary 
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          cancelPurchase={this.purchasingCancelHandler}
          continuePurchase={this.purchasingContinueHandler}
        />
      );
    }
    if(this.state.loading === true){
      orderSummary = <Spinner />;
    };

    return (
      <Auxiliary>
        <Modal show={this.state.purchasing} loading={this.state.loading} closeModal={this.purchasingCancelHandler}>
          {orderSummary}
        </Modal>
        <div className={classes.BurgerBuilder}>
          {burger}
        </div>
      </Auxiliary>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);