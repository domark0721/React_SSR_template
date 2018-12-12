import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'

const middlewares = []
let composeEnhancers

/* eslint-disable no-underscore-dangle */
if (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
} else {
  composeEnhancers = compose
}
const configureStore = preloadedState => (
  createStore(
    rootReducer,
    preloadedState,
    composeEnhancers
      ? composeEnhancers(applyMiddleware(...middlewares))
      : applyMiddleware(...middlewares),
  )
)

export default configureStore
