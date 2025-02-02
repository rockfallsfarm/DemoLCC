import React from 'react';
import ReactDOM from 'react-dom';


import './css/index.css';
import 'bootstrap/dist/css/bootstrap.css';


import App from './components/App';
import * as serviceWorker from './serviceWorker';


import 'jquery/dist/jquery.js';
import 'popper.js/dist/umd/popper.js';
import 'bootstrap/dist/js/bootstrap.js';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
