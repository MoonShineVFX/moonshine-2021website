import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import { BrowserRouter, Switch } from 'react-router-dom';
import 'animate.css'
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <App />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

