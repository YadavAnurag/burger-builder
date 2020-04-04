import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './BurgerBuilder.module.scss';
import axios from '../../axios-orders'; 
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component{
  state = {
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
    
    return sum > 0;
  };

  purchasingHandler = () => {
    this.setState({purchasing: true});
  };
  purchasingCancelHandler = () => {
    this.setState({purchasing: false});
  };
  purchasingContinueHandler = () => {
    this.props.history.push('/checkout');
  }

  render(){

    const disabledInfo = {
      ...this.props.ings
    };

    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded...!</p> : <Spinner />;
    if(this.props.ings){
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ings} />
          <BuildControls 
            addIngredient={this.props.onIngredientAdded} 
            removeIngredient={this.props.onIngredientRemoved}
            disabledInfo={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            price={this.props.price}
            ordered={this.purchasingHandler}
          />
        </Auxiliary>
      );

      orderSummary = (
        <OrderSummary 
          ingredients={this.props.ings}
          price={this.props.price}
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

const mapStateToProps = (state) => ({
  ings: state.ingredients,
  price: state.totalPrice
});
const mapDispatchToProps = (dispatch) => ({
  onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName}),
  onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENTS, ingredientName: ingName})
});
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));