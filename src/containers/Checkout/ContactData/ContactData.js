import React from 'react';

import { connect } from 'react-redux';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import './ContactData.css';
import createObject from './helper';
import * as orderActions from '../../../store/actions/index';

class ContactData extends React.Component{
  state = {
    orderForm: {
      name: createObject({elementType: 'input', elementConfig: {type: 'text', placeholder: 'Name'}, value: ''}),
      email: createObject({elementType: 'input', elementConfig: {type: 'email', placeholder: 'Email'}, value: ''}),
      street: createObject({elementType: 'input', elementConfig: {type: 'text', placeholder: 'Street'}, value: ''}),
      pinCode: createObject({elementType: 'input', elementConfig: {type: 'text', placeholder: 'Pin Code'}, value: ''}),
      state: createObject({elementType: 'input', elementConfig: {type: 'text', placeholder: 'State'}, value: ''}),
      deliveryMethod: createObject({
        elementType: 'select', 
        elementConfig:{
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'fastest' 
      })
    },
    formIsValid: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for(let formElementIdentifier in this.state.orderForm){
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price, // never send price to server, always calculate price on server
      orderData: formData,
      userId: this.props.userId
    };
    this.props.onOrderBurger(order, this.props.token);
  }

  checkValidity = (value, rules) => {
    let isValid = true;
    if(rules.required){
      isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLength){
      isValid = value.length >= rules.minLength && isValid;
    }
    if(rules.maxLength){
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }
  inputChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for(let inputIdentifier in updatedOrderForm){
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({orderForm: updatedOrderForm, formIsValid});
  }

  render(){
    const formElementsArray = [];
    for(let key in this.state.orderForm){
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form>
        <h4 className='heading'>Enter your Contact Data</h4>
        {formElementsArray.map(formElement => (
          <Input 
            key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig} 
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangeHandler(event, formElement.id)}
          />
        ))}
        <div className='centerDiv'>
          <Button btnType='Success' clicked={this.orderHandler} disabled={!this.state.formIsValid} >Order</Button>
        </div>
      </form>
    );
    if(this.props.loading){
      form = <Spinner />
    }

    return (
      <div className='ContactData'>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});
const mapDispatchToProps = (dispatch) => ({
  onOrderBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
});
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));