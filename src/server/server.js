/* eslint-disable no-console */
import React from 'react'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import webpackConfig from '../../webpack.config.dev'

import Html from '../Html'
import App from '../components/App/App'

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

app.get('*', (req, res) => {
  const context = {}
  const appRendered = renderToStaticMarkup(
    <StaticRouter location={req.url} context={context}>
      <Html>
        <App />
      </Html>
    </StaticRouter>,
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
