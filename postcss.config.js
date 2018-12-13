const postcssFlexbugsFixesPlugin = require('postcss-flexbugs-fixes')
const autoprefixerPlugin = require('autoprefixer')

module.exports = {
  plugins: [postcssFlexbugsFixesPlugin, autoprefixerPlugin],
}
