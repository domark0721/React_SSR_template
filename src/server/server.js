/* eslint-disable no-console */
import React from 'react'
import { Provider } from 'react-redux'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'


import webpackConfig from '../../webpack.config.dev'

import Html from '../Html'
import App from '../components/App/App'
import configureStore from '../store/index'

const compiler = webpack(webpackConfig)
const PORT = process.env.PORT || 3000

const app = express()

// Add middleware for connecting webpack bundle.js
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  hot: true,
  publickPath: webpackConfig.output.publicPath,
}))

// Add hot middleware support
app.use(webpackHotMiddleware(compiler))

const initialState = {
  commonReducer: {
    count: 1000,
  },
}

app.get('*', (req, res) => {
  const context = {}
  const store = configureStore(initialState)
  const preloadedState = store.getState()
  const appRendered = renderToStaticMarkup(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <Html preloadedState={preloadedState}>
          <App />
        </Html>
      </StaticRouter>
    </Provider>,
  )
  res.send(`<!DOCTYPE html> ${appRendered}`)
})

/* start server */
app.listen(PORT, () => {
  console.log(`Open Url http://localhost:${PORT} to get started`)
})


// app.use(async (ctx, next) => {
//   try {
//     await next()
//     if (ctx.status === 404) {
//       console.log('404')
//     }
//   } catch (e) {
//     /* eslint-disable no-console */
//     console.log(e)
//   }
// })
