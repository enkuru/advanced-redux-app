import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';
import reduxPromiseMiddleware from 'redux-promise-middleware';


const initialState = {
  fetching: false,
  fetched: false,
  users: [],
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERS_PENDING':
      return {...state, fetching: true};
    case 'FETCH_USERS_REJECTED':
      return {...state, fetching: false, error: action.payload};
    case 'FETCH_USERS_FULFILLED':
      return {...state, fetching: false, fetched: true, users: action.payload};
    default:
      return state;
  }
};

const middleware = applyMiddleware(reduxPromiseMiddleware(), thunk, logger);
const store = createStore(reducer, middleware);

const process = store.dispatch({
  /*middleware sayesinde basitçe try catch yerine tek başına bu işlemleri yapmasını sağlıyoruz*/
  type: 'FETCH_USERS',
  payload: axios.get('https://jsonplaceholder.typicode.com/users').then(res => res.data)
});

process.then(res => {/*eğer işlem sonrasında yapılacak işlem varsa bu şekilde istediğimiz işlemi yaptırabiliyoruz*/
  console.log(res);
});

/*store.dispatch(dispatch => {
  dispatch({type: 'FETCH_USERS_START'});

  axios.get('https://jsonplaceholder.typicode.com/users').then(res => res.data)
    .then(users => dispatch({type: 'RECEIVE_USERS', payload: users}))
    .catch(error => dispatch({type: 'FETCH_USERS_ERROR', payload: error}));
});*/

ReactDOM.render(<App/>, document.getElementById('root'));
serviceWorker.unregister();
