import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import {burgerBuilderReducer, orderReducer, authReducer } from './store/reducers/index';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


// const logger = store => {
//   return next => {
//     return action => {
//       console.log('[Middleware] Dispatching', action);
//       const result = next(action);
//       console.log('[Middleware] next State', store.getState);
//       return result;
//     }
//   }
// };
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
const app = (
  <Provider store={store}>
    <BrowserRouter basename='/'>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render( app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
