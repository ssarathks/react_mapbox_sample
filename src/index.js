import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {applyMiddleware, combineReducers, createStore, compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import authReducer from './Store/Reducers/auth';

const rootReducer = combineReducers({
  auth : authReducer
})

const comboseEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,comboseEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store = {store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
