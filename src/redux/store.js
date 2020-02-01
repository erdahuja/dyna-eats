import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import { fetchCollectionsStart } from './shop/shop.saga.js'

const sagaMw = createSagaMiddleware();

const middlewares = [sagaMw];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMw.run(fetchCollectionsStart)

export const persistor = persistStore(store);

export default { store, persistStore };
