"use strict"
const CONFIG = require('./config')

var koa = require('koa')
var app = koa();

const kk = [1,1,2,2,2]
function sendRenderResult(html) {
  return `<!doctype html>
    <html>
    <head><title>Training Project</title>
    </head>
    <body>
      <div id="app">${html}</div>
      <script src="/dist/bundle.js"></script>
    </body>
  </html>`
}

app.use(function *(){
  this.body = sendRenderResult(123)
})

app.listen(CONFIG.HOST_PORT)
