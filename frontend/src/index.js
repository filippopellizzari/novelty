import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'

import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App'
import configureStore from './store'


const history = createHistory()
const { persistor, store } = configureStore(history)

ReactDOM.render(
  <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
  </Provider>,
  document.getElementById('root')
  );
