import React from 'react';
import { connect } from 'react-redux';
import { authLogout } from '../../store/actions/index';
import { Redirect } from 'react-router-dom';


class Logout extends React.Component{

  componentDidMount(){
    this.props.onLogout();
  }

  render(){
    return (
      <Redirect to='/' />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(authLogout())
  }
};
export default connect(null, mapDispatchToProps)(Logout);