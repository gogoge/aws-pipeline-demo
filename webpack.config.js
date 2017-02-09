const path = require('path')
const webpack = require('webpack')

module.exports = {
  // or devtool: 'eval' to debug issues with compiled output:
  // devtool: 'cheap-module-eval-source-map',
  entry: [
    // necessary for hot reloading with IE:
    // 'eventsource-polyfill',
    // listen to code updates emitted by hot middleware:
    // 'webpack-hot-middleware/client',
    // your code:
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin(),
  //   new webpack.NoEmitOnErrorsPlugin(),
  // ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      include: path.join(__dirname, 'src'),
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }],
            'react',
          ],
        },
      }],
    }],
  },
}
