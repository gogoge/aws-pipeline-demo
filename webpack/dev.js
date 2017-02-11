const webpackMerge = require('webpack-merge')
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const commonConfig = require('./base.js')
const webpack = require('webpack')
const path = require('path')
module.exports = function (env) {
  return webpackMerge(commonConfig(), {
    entry: [
      // necessary for hot reloading with IE:
      // 'eventsource-polyfill',
      // listen to code updates emitted by hot middleware:
      'webpack-dev-server/client?http://localhost:3000', // WebpackDevServer host and port
      'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    ],
    // devtool: 'eval-source-map',
    plugins: [
      // BundleAnalyzerPlugin will show you how much space each library in your app is using.
      // new BundleAnalyzerPlugin(),
      // new BrowserSyncPlugin(

      //   {
      //     host: 'localhost',
      //     port: 3001,
      //     proxy: {
      //       target: 'http://localhost:3000',
      //       ws: true,
      //     },
      //   // server: { baseDir: ['.'] }, //browser monitor html, its root should have index.html
      //   }, {
      //     reload: false,
      //   }
      // ),
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
          loader: ['react-hot', 'babel-loader'],
          options: {
            presets: [
              ['es2015', { modules: false }],
            ],
          },
        }],
      }],
    },

    // module: {
    //   loaders: [
    //     {
    //       test: /\.scss$/,
    //       loader: ExtractTextPlugin.extract({
    //         fallbackLoader: 'style-loader',
    //         loader: 'css-loader!sass-loader',
    //       }),
    //     },
    //   ],
    // },
  })
}
