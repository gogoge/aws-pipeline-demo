// const path = require('path')


// module.exports = function(env) {
//   return {
//     // or devtool: 'eval' to debug issues with compiled output:
//     // devtool: 'cheap-module-eval-source-map',
//     entry: [
//       // necessary for hot reloading with IE:
//       // 'eventsource-polyfill',
//       // listen to code updates emitted by hot middleware:
//       // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
//       // your code:
//       './src/index',
//     ],
//     output: {
//       path: path.join(__dirname, 'build'),
//       filename: 'bundle.js',
//       publicPath: '/build/',
//     },
//     module: {
//       rules: [{
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         include: path.join(__dirname, '..', 'src'), //`${__dirname}/../src`,
//         use: [{
//           loader: 'babel-loader',
//           options: {
//             presets: [
//               ['es2015', { modules: false }],
//             ],
//           },
//         }],
//       }],
//     },
//   }
// }
const webpackMerge = require('webpack-merge')
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const commonConfig = require('./base.js')
const webpack = require('webpack')
const path = require('path')
module.exports = function (env) {
  // return webpackMerge(commonConfig(), {
    return {
    entry: [
      // necessary for hot reloading with IE:
      // 'eventsource-polyfill',
      // listen to code updates emitted by hot middleware:
      // 'webpack-dev-server/client?http://localhost:3000', // WebpackDevServer host and port
      // 'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
      './src/index',
    ],
    // devtool: 'eval-source-map',
    plugins: [
      // BundleAnalyzerPlugin will show you how much space each library in your app is using.
      // new BundleAnalyzerPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      // new ExtractTextPlugin('css/app.css'),
      // new OptimizeJsPlugin({
      //   sourceMap: true,
      // }),
    ],
    module: {
      rules: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, '..', 'src'),
        use: [{
          // loader: ['react-hot', 'babel-loader'],
          loader: ['babel-loader'],
          options: {
            presets: [
              ['es2015', { modules: false }],
            ],
          },
        }],
      }],
    },
  }
}
