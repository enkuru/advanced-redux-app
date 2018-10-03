import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

const initialState = {
  fetching: false,
  fetched: false,
  users: [],
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERS_START':
      return {...state, fetching: true};
    case 'FETCH_USERS_ERROR':
      return {...state, fetching: false, error: action.payload};
    case 'RECEIVE_USERS':
      return {...state, fetching: false, fetched: true, users: action.payload};
    default:
      return state;
  }
};

const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducer, middleware);

store.dispatch(dispatch => {
  dispatch({type: 'FETCH_USERS_START'});

  axios.get('https://jsonplaceholder.typicode.com/users').then(res => res.data)
    .then(users => dispatch({type: 'RECEIVE_USERS', payload: users}))
    .catch(error => dispatch({type: 'FETCH_USERS_ERROR', payload: error}));
});

ReactDOM.render(<App/>, document.getElementById('root'));
serviceWorker.unregister();
