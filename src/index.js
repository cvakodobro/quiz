import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { store } from './store/index.js';
import AppContainer from './containers/appContainer';

ReactDOM.render(
  // <React.StrictMode>
  //   <AppContainer store={store} />
  // </React.StrictMode>,
  // document.getElementById('root')
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
