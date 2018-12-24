/* eslint-disable no-console */
import React from 'react'
import { Provider } from 'react-redux'
import { readFileSync } from 'jsonfile'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import path from 'path'
import fs from 'fs'

import webpackConfig from '../../webpack'

import Html from '../Html'
import App from '../components/App/App'
import configureStore from '../store/index'

const isDev = process.env.NODE_ENV !== 'production'
const PORT = process.env.PORT || 3000

const app = express()

let manifest
const jsAssets = []
const cssAssets = []

if (isDev) {
  const compiler = webpack(webpackConfig)
  // Add middleware for connecting webpack bundle.js
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      hot: true,
      publicPath: webpackConfig.output.publicPath,
      serverSideRender: true,
    }),
  )
  // Add hot middleware support
  app.use(webpackHotMiddleware(compiler))
  jsAssets.push('/dist/bundle.js')
  cssAssets.push('/dist/main.css')
} else {
  app.use('/dist', express.static(path.resolve(__dirname, '..', '..', 'dist')))

  // lookup the file from manifest
  manifest = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'dist', 'manifest.json'), 'utf8'))

  Object.keys(manifest).forEach((item) => {
    const extension = item.split('.')
    switch (extension[1]) {
      case 'css':
        cssAssets.push(manifest[item])
        break
      case 'js':
        jsAssets.push(manifest[item])
        break
      default:
    }
  })
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

  const appRendered = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <Html
          preloadedState={preloadedState}
          jsAssets={jsAssets}
          cssAssets={cssAssets}
        >
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
