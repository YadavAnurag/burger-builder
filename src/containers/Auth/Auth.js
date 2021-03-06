import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import './Auth.css';
import { Redirect } from 'react-router-dom';


class Auth extends React.Component{
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSingUp: true
  }

  componentDidMount(){
    if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
      this.props.onSetAuthRedirectPath();
    }
  }
  checkValidity = (value, rules) => {
    let isValid = true;
    if(rules.required){
      isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLength){
      isValid = value.length >= rules.minLength && isValid;
    }
    if(rules.maxLength){
      isValid = value.length <= rules.maxLength && isValid;
    }
    if(rules.isEmail){
      isValid = true;
    }
    return isValid;
  }
  inputChangeHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };
    this.setState({controls: updatedControls});
  }
  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSingUp: !prevState.isSingUp
      }
    })
  }
  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSingUp);
  }



  render(){
    const formElementsArray = [];
    for(let key in this.state.controls){
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = formElementsArray.map(formElement => {
      return (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => this.inputChangeHandler(event, formElement.id)}
        />
      );
    });

    if(this.props.loading){
      form = <Spinner />
    }

    let errorMessage = null;
    if(this.props.error){
      errorMessage = <p>{this.props.error}</p>
    }
    
    let authRedirect = null;
    if(this.props.isAuthenticated){
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }
    return (
      <div className='Auth'>
        {authRedirect}
        <h4 className='heading'>{this.state.isSingUp ? 'Register' : 'Sign In'}</h4>
        {this.props.error && errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <div className='centerDiv'>
            <Button 
              btnType='Success' 
            >{this.state.isSingUp ? 'Register' : 'Sign In'}</Button>
          </div>
        </form>
        <div className='centerDiv'>
          <Button
            clicked={this.switchAuthModeHandler}
          >Switch to {this.state.isSingUp ? 'Sign-In' : 'Sign-Up'}</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
}

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, isSingUp) => dispatch(actions.auth(email, password, isSingUp)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
});
export default connect(mapStateToProps, mapDispatchToProps)(Auth);