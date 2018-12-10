import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
// import { AppContainer } from 'react-hot-loader'

import store from './store'

import App from './components/App/App'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

// const render = (Component) => {
//   ReactDOM.render(
//     <AppContainer>
//       <Provider store={store}>
//         <Component />
//       </Provider>
//     </AppContainer>,
//     document.getElementById('root'),
//   )
// }

// render(App)
// const root = require('./components/App/App').default

// if (module.hot) {
//   module.hot.accept(
//     './components/App/App',
//     () => {
//       const NextRootContainer = root
//       render(NextRootContainer)
//     }, // if you are using harmony module ({ modules: false })
//   )
// }
