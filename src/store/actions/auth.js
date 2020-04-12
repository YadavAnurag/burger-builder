import axios from 'axios';

import * as actionTypes from './actionTypes';


export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};
export const authSuccess = ({ idToken, localId:userId }) => {

  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};
export const authLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
};
export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};
export const auth = (email, password, isSingUp) => {
  return (dispatch) => {
    dispatch(authStart());
    
    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA5Ptnm_LY9MQw1jqB3--JR2lZVSl1dOf4';
    if(!isSingUp){
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA5Ptnm_LY9MQw1jqB3--JR2lZVSl1dOf4';
    }
    axios.post(url, authData)
      .then(response => {
        console.log(response);
        
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);

        dispatch(authSuccess(response.data));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(error => {
        console.log(error.response.data.error.message);
        dispatch(authFail(error.response.data.error.message));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if(!token){
      dispatch(authLogout());
    }else{
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if(expirationDate <= new Date()){
        dispatch(authLogout());
      }else{
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess({idToken: token, localId: userId}));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
};