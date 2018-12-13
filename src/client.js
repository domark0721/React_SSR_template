import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
// import { AppContainer } from 'react-hot-loader'

import configureStore from './store'

import App from './components/App/App'

const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__
const store = configureStore(preloadedState)

const jsx = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)

ReactDOM.hydrate(jsx, document.getElementById('root'))

if (module.hot) {
  module.hot.accept('./components/App/App.jsx', () => {
    ReactDOM.hydrate(jsx, document.getElementById('root'))
  })
}
