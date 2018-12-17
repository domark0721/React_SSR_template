/* eslint-disable no-console */
import path from 'path'
import React from 'react'
import { Provider } from 'react-redux'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import webpackConfig from '../../webpack'

import Html from '../Html'
import App from '../components/App/App'
import configureStore from '../store/index'

const isDev = process.env.NODE_ENV !== 'production'
const PORT = process.env.PORT || 3000

const app = express()

app.use('/assets', express.static(path.resolve(__dirname, '..', '..', 'dist')))

if (isDev) {
  const compiler = webpack(webpackConfig)
  // Add middleware for connecting webpack bundle.js
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      hot: true,
      publickPath: webpackConfig.output.publicPath,
      serverSideRender: true,
    }),
  )
  // Add hot middleware support
  app.use(webpackHotMiddleware(compiler))
}

const initialState = {
  commonReducer: {
    count: 1000,
  },
}

app.get('*', (req, res) => {
  const context = {}
  const store = configureStore(initialState)
  const preloadedState = store.getState()

  // console.log(res.locals)
  const jsAssets = []
  const cssAssets = []

  if (isDev) {
    const {
      assetsByChunkName: { main },
      outputPath,
    } = res.locals.webpackStats.toJson()
    const { fs } = res.locals

    main.forEach((sourcePath) => {
      if (sourcePath.endsWith('.js')) {
        jsAssets.push(sourcePath)
      }

      if (sourcePath.endsWith('.css')) {
        cssAssets.push(fs.readFileSync(`${outputPath}/${sourcePath}`))
      }
    })
  }

  const appRendered = renderToStaticMarkup(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <Html preloadedState={preloadedState} jsAssets={jsAssets} cssAssets={cssAssets}>
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
