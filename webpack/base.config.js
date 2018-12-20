const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpackBabelOptions = require('../.babelrc.webpack.js')

const outputDir = 'dist'
const isProd = process.env.NODE_ENV === 'production'
const cssLoadersForDev = isProd ? [] : [{ loader: 'css-hot-loader' }]

module.exports = {
  context: path.join(__dirname, '../', 'src'),
  entry: ['./client.js'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              ...webpackBabelOptions,
              babelrc: false,
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          ...cssLoadersForDev,
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]_[hash:base64:5]',
            },
          },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // bundle
  output: {
    path: path.resolve(__dirname, '..', outputDir),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin([outputDir], {
      root: path.resolve(__dirname, '..'),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}
