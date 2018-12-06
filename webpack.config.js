const path = require('path')

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      }
    ],
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    }
  },
  // bundle 
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  // server 
  devServer: {
    contentBase: './dist',
  }
}