"use strict"
const CONFIG = require('./config')
const GLOBAL_PATH = require('./path')
// 1.
const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const staticPath = require('koa-static')
const mount = require('koa-mount')

// 1. static folder
app.use(mount('/build', staticPath(GLOBAL_PATH.BUILD_PATH, { defer: CONFIG.BROWSER_CACHE_MAXAGE  })))
app.use(staticPath('.', { defer: CONFIG.BROWSER_CACHE_MAXAGE  }))

// 1. koa-router init
app
  .use(router.routes())
  .use(router.allowedMethods())

// 1. koa-router rules
router.get('/', function (ctx, next) {
  ctx.body = sendRenderResult(123)
})

app.listen(CONFIG.HOST_PORT, ()=> {
  console.log(CONFIG.SVR_READY_MSG)
})
