/* eslint-disable no-console */

const logger = async (ctx, next) => {
  const { res } = ctx
  console.log(`<-- ${ctx.method} ${ctx.url}`)

  await next()

  res.on('finish', () => {
    console.log(`--> ${ctx.method} ${ctx.url}`)
  })
}

module.exports = logger
