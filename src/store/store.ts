import {
  compose,
  applyMiddleware,
  Middleware
} from 'redux'
import { legacy_createStore as createStore } from 'redux'
import logger from 'redux-logger'
import { rootReducer } from './root-reducer'
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
//import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

import { rootSaga } from './root-saga'
/**
 * The loggerMiddleware function takes a store as an argument, returns a function that takes a next
 * function as an argument, which returns a function that takes an action as an argument, which logs
 * the action type, payload, current state, and next state.
 * @param store - The store object that is passed to the redux createStore function.
 * @returns A function that takes a store as an argument and returns a function that takes a next as an
 * argument and returns a function that takes an action as an argument.
 */

export type RootState = ReturnType<typeof rootReducer>

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],

}

const sagaMiddleware = createSagaMiddleware()


const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

/* Checking if the environment is not production, and if it is not, it is adding the logger middleware
to the middleware array. */
const middleWares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware,].filter((middleware): middleware is Middleware => Boolean(middleware));
/* Creating a composedEnhancers object that is composed of the applyMiddleware function. */
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))



/* Creating a store object that is composed of the rootReducer, undefined, and composedEnhancers. */
export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store)


