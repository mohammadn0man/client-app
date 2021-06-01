import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import App from './App';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from './store';

axios.defaults.baseURL = "http://localhost:8082";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

