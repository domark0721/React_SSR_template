const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')

const outputDir = 'dist'

module.exports = {
  context: path.join(__dirname, '../', 'src'),
  entry: ['./client.js'],
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
    publicPath: '/dist',
    filename: 'bundle.js',
  },
  plugins: [
    new AssetsPlugin({
      keepInMemory: true,
    }),
    new CleanWebpackPlugin([outputDir], {
      root: path.resolve(__dirname, '..'),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}
