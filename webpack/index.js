const devConfig = require('./dev.config')
const prodConfig = require('./prod.config')

const isProd = process.env.NODE_ENV === 'production'

module.exports = isProd ? prodConfig : devConfig
