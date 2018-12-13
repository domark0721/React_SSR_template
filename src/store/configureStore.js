import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from '../reducers'
import rootSaga from '../sagas'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

let composeEnhancers

/* eslint-disable no-underscore-dangle */
// for devbug tools
if (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
} else {
  composeEnhancers = compose
}

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  composeEnhancers
    ? composeEnhancers(applyMiddleware(...middlewares))
    : applyMiddleware(...middlewares),
)

export const runSaga = () => (
  sagaMiddleware.run(rootSaga)
)

export default configureStore
