import React from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.scss';


class Layout extends React.Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }
  sideDrawerToggleHandler = () => {
    this.setState(prevState => ({showSideDrawer: !prevState.showSideDrawer}));
  };

  render(){
    return (
      <Auxiliary>
        <Toolbar 
          drawerToggleClicked={this.sideDrawerToggleHandler} 
          isAuthenticated={this.props.isAuthenticated}
        />
        <SideDrawer 
          isAuthenticated={this.props.isAuthenticated}
          open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Auxiliary>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};
export default connect(mapStateToProps)(Layout);