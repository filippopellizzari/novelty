//Author: Filippo Pellizzari, 2018

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import rootReducer from "./reducers/rootReducer";
import jwtUpdate from './utils/jwtUpdate';


const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

jwtUpdate(store);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
  );
