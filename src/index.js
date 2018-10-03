import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {createStore} from 'redux';

const initialState = {
  count: 1,
  values: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD':/*bu şekilde immutable değişken sağlıyoruz, yani memory deki değişken alınır değiştirilir ve yeniden gönderilir, üzerine yazılarak sadece son state durumuna sahip olma problemini giderir*/
      //return Object.assign({}, state, {count: state.count + action.payload});/*bu şekilde de kullanılabilir */

      // state.values.push(action.payload);//   -> hatalı
      return {
        ...state,
        count: state.count + action.payload,
        values: [...state.values, action.payload]//bu şekilde state e direkt olarak erişilmez ve üzerine yazma yapılmaz, redux için önemli! (immutable state)
      };
    case 'SUBTRACT':
      state.values.push(action.payload);
      return {
        ...state,
        ...state,
        count: state.count - action.payload,
        values: [...state.values, action.payload]
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
