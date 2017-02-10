"use strict"
const CONFIG = require('./config')

// 1.
const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const staticPath = require('koa-static')

// // 2. webpack dev server and hot reload middleware
const webpackDevMiddleware = require('webpack-dev-middleware')
// // const webpackHotMiddleware = require("webpack-hot-middleware")
const webpackConfig = require('./webpack.config.js')
const webpack = require('webpack')
const compiler = webpack(webpackConfig('dev'))

// // 2. ref: https://segmentfault.com/a/1190000004883199?utm_source=tuicool&utm_medium=referral
const koaWebpackMiddleware = (compiler, options = {}) => {
  const { publicPath } = compiler.options.output
  // if middleware opts exist, use it instead webpack.config
  const defaults = options.publicPath ? options : {publicPath, stats}
  const middleware = webpackDevMiddleware(compiler, Object.assign({}, defaults, options))
  return async (context, next) => {
    const hasNext = await applyMiddleware(middleware, context.req, {
      send: content => context.body = content,
      setHeader: function() {context.set.apply(context, arguments)}
    });
    hasNext && await next()
  }
}

// // 2. ref: https://segmentfault.com/a/1190000004883199?utm_source=tuicool&utm_medium=referral
function applyMiddleware(middleware, req, res) {
  const _send = res.send;
  return new Promise((resolve, reject) => {
    try {
      res.send = function() {_send.apply(res, arguments) && resolve(false)};
      middleware(req, res, resolve.bind(null, true));
    } catch (error) {
      reject(error);
    }
  });
}

app.use(koaWebpackMiddleware(compiler, {
  // display no info to console (only warnings and errors)
  noInfo: false,
  // display nothing to the console
  quiet: false,
  // switch into lazy mode
  // that means no watching, but recompilation on every request
  lazy: false,
  // watch options (only lazy: false)
  watchOptions: {
      aggregateTimeout: 300,
      poll: true
  },
  // custom headers
  headers: { "X-Custom-Header": "yes" },
  // public path to bind the middleware to
  // use the same as in webpack
  publicPath: webpackConfig('dev').output.publicPath,
  // options for formating the statistics
  stats: { colors: true }
}))
// 1. static folder
app.use(staticPath('build', CONFIG.BROWSER_CACHE_MAXAGE)) // path and browser cache time (ms)

// 1. koa-router init
app
  .use(router.routes())
  .use(router.allowedMethods())

// 1. koa-router rules
router.get('/', function (ctx, next) {
  ctx.body = sendRenderResult(123)
})


function sendRenderResult(html) {
  return `<!-- index.html -->
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Hello webpack</title>
      </head>
      <body>
        <div id="react-root">1</div>
        <script src="build/bundle.js"></script>
      </body>
    </html>`
}


app.listen(CONFIG.HOST_PORT)
