import '@babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import configureStore, { runSaga } from './store'

import App from './components/App/App'

const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__
const store = configureStore(preloadedState)
runSaga()

const render = () => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    document.getElementById('root'),
  )
}

render()

if (module.hot) {
  module.hot.accept('./components/App/App.jsx', () => {
    render()
  })
}
