import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { MyContext } from "./context";
import './index.css';
import App from './App';
// On importe la classe `UserProvider`
import Context from "./context";

ReactDOM.render(
  <Provider store={store}>
    <Context>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Context>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
