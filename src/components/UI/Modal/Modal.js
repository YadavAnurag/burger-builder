import React from 'react';
import propTypes from 'prop-types';

import classes from './Modal.module.scss';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {

  shouldComponentUpdate(nextProps, nextState){
    //return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    if(nextProps.loading !== this.props.loading) return true;
    return nextProps.show !== this.props.show; 
  }
  UNSAFE_componentWillUpdate(){
    console.log('[Modal] willUpdate');
  }

  render(){
    return (
      <Auxiliary>
        <Backdrop show={this.props.show} clicked={this.props.closeModal} />
        <div 
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
        >
          {this.props.children}
        </div>
      </Auxiliary>
    );
  }
}

Modal.propTypes = {
  show: propTypes.bool,
  loading: propTypes.bool,
  clicked: propTypes.func
};
export default Modal;