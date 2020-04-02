import React from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import './Orders.css';

class Orders extends React.Component{
  state = {
    orders: null,
    loading: false
  }

  componentDidMount(){
    axios.get('/orders.json')
      .then(res => {
        const fetchedOrders = [];
        for(let key in res.data){
          fetchedOrders.push({...res.data[key], id: key});
        }
        this.setState({loading: false, orders: fetchedOrders});
      })
      .catch(error =>  this.setState({loading: false}))
  }

  render(){
    let orders = <Spinner />;
    if(this.state.orders){
      orders = (
        <div className='Orders'>
          {this.state.orders.map(order => (
            <Order 
              key={order.id}
              ingredients={order.ingredients}
              price={+order.price}
            />
          ))}
        </div>
      );
    }

    return (
      {...orders}
    );
  }
}

export default withErrorHandler(Orders, axios);