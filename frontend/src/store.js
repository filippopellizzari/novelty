import storage from 'redux-persist/es/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore} from 'redux';
import { routerMiddleware } from 'react-router-redux'
import { apiMiddleware } from 'redux-api-middleware';

import rootReducer from './reducers'

const config = {
  key: 'root',
  storage
}

const reducer = persistReducer(config,rootReducer)

export default function configureStore (history) {

  let store = createStore(
    reducer, {}, composeWithDevTools(
      applyMiddleware(apiMiddleware,routerMiddleware(history))
    )
  )
  let persistor = persistStore(store)


  return { persistor, store }
}
