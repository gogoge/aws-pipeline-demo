// const webpackMerge = require('webpack-merge')
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const GLOBAL_PATH = require('./path')

const context = `${__dirname}`
module.exports = {
  context,
  entry: [
    // for redux-sagas
    'babel-polyfill',
    // necessary for hot reloading with IE:
    // 'eventsource-polyfill',
    // listen to code updates emitted by hot middleware:
    // 'react-hot-loader/patch',
    // activate HMR for React

    // 'webpack-dev-server/client?http://0.0.0.0:3000',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    // 'webpack/hot/only-dev-server',
    // 'webpack-hot-middleware/client',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server',
    'webpack-hot-middleware/client?http://0.0.0.0:3000',
    './src/app/',
  ],
  // devtool: 'eval-source-map',
  // plugins: [
    // BundleAnalyzerPlugin will show you how much space each library in your app is using.
    // new BundleAnalyzerPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    // new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    // new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors
    // new ExtractTextPlugin('css/app.css'),
    // new OptimizeJsPlugin({
    //   sourceMap: true,
    // }),
  // ],
  output: {
    path: GLOBAL_PATH.BUILD_PATH,
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

  ],
  module: {
    rules: [
      {
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
            'plugins': [
              'transform-decorators-legacy',
              ['transform-class-properties', { 'spec': true }],
              ['react-css-modules', { context, webpackHotModuleReloading: true }],
            ],
          },

        }],
      },
      {
        test: /\.css?$/,
        include: path.join(__dirname, 'src'),
        use: [
          'style-loader',
          'css-loader?importLoader=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
        ],
      },
    ],
  },
}

