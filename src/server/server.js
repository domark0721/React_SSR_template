/* eslint-disable no-console */
import React from 'react'
import express from 'express'
import webpack from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
import { renderToStaticMarkup } from 'react-dom/server'
import webpackConfig from '../../webpack.config'


import Html from '../Html'
import App from '../components/App/App'

const compiler = webpack(webpackConfig)
const PORT = process.env.PORT || 3000

const app = express()

app.use(devMiddleware(compiler, {
  noInfo: true,
  publickPath: webpackConfig.output.publicPath,
}))

app.get('*', (req, res) => {
  const appRendered = renderToStaticMarkup(
    <Html>
      <App />
    </Html>,
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
