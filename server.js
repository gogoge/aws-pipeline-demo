"use strict"
const CONFIG = require('./config')

const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()
const staticPath = require('koa-static')

// static folder
app.use(staticPath('build', CONFIG.BROWSER_CACHE_MAXAGE)) // path and browser cache time (ms)

// koa-router init
app
  .use(router.routes())
  .use(router.allowedMethods())

// koa-router rules
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
        <script src="bundle.js"></script>
      </body>
    </html>`
}


app.listen(CONFIG.HOST_PORT)
