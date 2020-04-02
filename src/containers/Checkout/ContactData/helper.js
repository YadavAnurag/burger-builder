const createObject = ({elementType, elementConfig, value}) => {
  return ({
    elementType,
    elementConfig: {...elementConfig},
    value
  });
}

export default createObject;