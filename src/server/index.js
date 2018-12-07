const Koa = require('koa')
const logger = require('./middlewares/logger')
const router = require('../Router')

const app = new Koa()
const PORT = process.env.PORT || 3000

app.use(logger)
app.use(router.routes())
app.use(router.allowedMethods())

/* start server */
app.listen(PORT, () => {
  /* eslint-disable no-console */
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
