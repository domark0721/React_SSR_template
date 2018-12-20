const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const base = require('./base.config')

module.exports = webpackMerge(base, {
  entry: ['webpack-hot-middleware/client'],
  mode: 'development',
  watch: true,
  plugins: [
    new ManifestPlugin({
      fileName: 'manifest.json',
      writeToFileEmit: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
})
