import React from 'react';

import classes from './Backdrop.module.scss';

const Backdrop = (props) => {
  return (
    <div>
      {props.show ? (
        <div className={classes.Backdrop} onClick={props.clicked} ></div>
      ) : null}
    </div>
  );
};

export default Backdrop;