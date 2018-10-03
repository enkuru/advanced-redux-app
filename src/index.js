import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {createStore} from 'redux';

const initialState = {
  count: 1,
  users: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD':/*bu şekilde mutable değişken sağlıyoruz, yani memory deki değişken alınır değiştirilir ve yeniden gönderilir, üzerine yazılarak sadece son state durumuna sahip olma problemini giderir*/
      /*return {
        ...state,
        count: state.count + action.payload
      };*/

      return Object.assign({}, state, {count: state.count + action.payload});/*bu şekilde de kullanılabilir */
    case 'SUBTRACT':
      return {
        ...state,
        count: state.count - action.payload
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => {
  console.log('store updated!', store.getState());
});

store.dispatch({
  type: 'ADD',
  payload: 1
});

store.dispatch({
  type: 'ADD',
  payload: 10
});

store.dispatch({
  type: 'SUBTRACT',
  payload: 5
});

ReactDOM.render(<App/>, document.getElementById('root'));
serviceWorker.unregister();
