import React from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import './ContactData.css';


class ContactData extends React.Component{
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      pinCode: '',
      state: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price, // never send price to server, always calculate price on server
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
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false});
      });
  }

  render(){

    let form = (
      <form>
        <input type="text" name="name" placeholder="Your Name"/>
        <input type="email" name="email" placeholder="Your Email"/>
        <input type="street" name="street" placeholder="Street"/>
        <input type="text" name="street" placeholder="Pin Code"/>
        <input type="text" name="state" placeholder="State"/>
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
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;