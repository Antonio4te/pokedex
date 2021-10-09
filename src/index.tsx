import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware, compose, AnyAction } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk, { ThunkDispatch } from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import reducers from './store/reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware<ThunkDispatch<RootState, undefined, AnyAction>, RootState>(reduxThunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);