import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage';

import messageApp from './reducers'

const reducer = storage.reducer(messageApp);
const engine = createEngine('s2p');
const storageMiddleware = storage.createMiddleware(engine);
const loggerMiddleware = createLogger()
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, storageMiddleware, loggerMiddleware)(createStore);


export const store = createStoreWithMiddleware(reducer);
export const load = storage.createLoader(engine);
