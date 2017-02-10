"use strict"
const CONFIG = require('./config')

// 1.
const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const staticPath = require('koa-static')

// 2. webpack dev server and hot reload middleware
const webpackDevMiddleware = require('webpack-dev-middleware')
// const webpackHotMiddleware = require("webpack-hot-middleware")
const webpackConfig = require('./webpack.config.js')
const webpack = require('webpack')
const compiler = webpack(webpackConfig)

// 2. ref: https://segmentfault.com/a/1190000004883199?utm_source=tuicool&utm_medium=referral
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

// 2. ref: https://segmentfault.com/a/1190000004883199?utm_source=tuicool&utm_medium=referral
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
  publicPath: webpackConfig.output.publicPath,
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
        <div id="react-root"></div>
        <script src="${compiler.options.output.publicPath}/bundle.js"></script>
      </body>
    </html>`
}


app.listen(CONFIG.HOST_PORT)
