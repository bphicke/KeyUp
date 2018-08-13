import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/index';
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import { BrowserRouter } from 'react-router-dom';


render(
  <BrowserRouter>
    <Provider store={store}>
      <Home/>
    </Provider>
  </BrowserRouter>, 
  document.getElementById('app')
);


