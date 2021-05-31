import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8082";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

