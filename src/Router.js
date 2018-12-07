// import App from './components/App/App'

const Router = require('koa-router')

const router = new Router()

router.get('/', (ctx, next) => {
  ctx.body = 'text'
})

module.exports = router
