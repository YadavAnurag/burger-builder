const createObject = ({elementType, elementConfig, value}) => {
  return ({
    elementType,
    elementConfig: {...elementConfig},
    value,
    validation: {
      required: true,
      minLength: 2,
      maxLength: 20
    },
    valid: false
  });
}

export default createObject;