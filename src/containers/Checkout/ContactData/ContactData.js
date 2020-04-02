import React from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import './ContactData.css';
import createObject from './helper';

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
        value: '' 
      })
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const formData = {};
    for(let formElementIdentifier in this.state.orderForm){
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price, // never send price to server, always calculate price on server
      orderData: formData
    };
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false});
      });
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
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({orderForm: updatedOrderForm});
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
        {formElementsArray.map(formElement => (
          <Input 
            key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig} 
            value={formElement.config.value}
            changed={(event) => this.inputChangeHandler(event, formElement.id)}
          />
        ))}
        <div className='centerDiv'>
          <Button btnType='Success' clicked={this.orderHandler} >Order</Button>
        </div>
      </form>
    );
    if(this.state.loading){
      form = <Spinner />
    }

    return (
      <div className='ContactData'>
        <h4 className='heading'>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;