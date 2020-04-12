import React from 'react';

import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';


const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/' exact >Burger Builder</NavigationItem>
      {props.isAuthenticated && <NavigationItem link='/orders' exact >Orders</NavigationItem>}
      {props.isAuthenticated ? (
        <NavigationItem link='/logout' exact >Logout</NavigationItem>
      ) : (
        <NavigationItem link='/auth' exact >Authenticate</NavigationItem>
      )}
    </ul>
  );
}

export default NavigationItems;