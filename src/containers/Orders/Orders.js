import React from 'react';

import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import './Orders.css';

class Orders extends React.Component{

  componentDidMount(){
    this.props.onFetchOrders(this.props.token);
  }

  render(){
    let orders = <Spinner />;
    if(!this.props.loading){
      orders = (
        <div className='Orders'>
          {this.props.orders.length !== 0 ? (
            this.props.orders.map(order => (
              <Order 
                key={order.id}
                ingredients={order.ingredients}
                price={+order.price}
              />
            ))
          ): (
            <p style={{color: 'white', textAlign: "center"}}>No orders....Go Build a delicious Burger!</p>
          )}
        </div>
      );
    }

    return (
      {...orders}
    );
  }
}

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token
});
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));