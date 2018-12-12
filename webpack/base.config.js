const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const outputDir = 'dist'

module.exports = {
  context: path.join(__dirname, '../', 'src'),
  // babel-polyfill is for IE
  entry: ['@babel/polyfill', './client.js'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]_[local]___[hash:base64:5]',
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
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin([outputDir]),
    new webpack.NoEmitOnErrorsPlugin(),
    // new HtmlWebpackPlugin(),
  ],
}
