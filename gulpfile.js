const gulp        = require('gulp')
const browserSync = require('browser-sync').create()
const nodemon = require('gulp-nodemon')
const CONFIG = require('./config')

const webpack  = require('webpack')
const webpackConfig   = require('./webpack.config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

gulp.task('browser-sync', function(done) {
  console.log(1)
  // next()
  const compiler = webpack(webpackConfig)
  browserSync.init({
    proxy: {
      target: 'http://0.0.0.0:3000',
      ws: true,
      middleware: [
        webpackDevMiddleware(compiler, {
          publicPath: webpackConfig.output.publicPath,
          stats: { colors: true },
        }),
        webpackHotMiddleware(compiler),
      ],
    },
    // port: 3000,
  }, () => {
    // done()
       // setTimeout(() => {
      done()
    // }, 5000)
  })
  
})

gulp.task('koa-dev-server', function(done) {
  console.log(2)

  const stream = nodemon({
    script: 'server.js',
    watch: ['server.js'],
    exec: './node_modules/.bin/babel-node',
    stdout: false,
  })
  stream.on('stdout', event => {
    const msg = event.toString()
    if (msg.indexOf(CONFIG.SVR_READY_MSG) > -1) {
      done()
    }
  })
  // stream.on('start', event => {
  //   serverVar.emitter.on('response', event => {
  //     // console.warn(event.toString())
  //     console.warn(event)
  //     // const rule = serverVar.readyMsg
  //     // const serverMsg = event.toString()
  //     // if(rule.test(serverMsg)) {
  //     //   done()
  //     // }
  //   })    
  // })

})

gulp.task('default', gulp.series('koa-dev-server', 'browser-sync',   function (done) {
  gulp.watch('index.html').on('change', browserSync.reload)
  // done()
}))



// gulp.task('default', ['dev'], function () {
// })
// gulp.task('a', (x) => {
//   console.warn('a')
//   x()
//   // console.warn('x in a is:' + x)
//   return 'a'
// })
// gulp.task('b', (x) => {
//   console.warn('b')
//   // console.warn('x in b is:' + x)
//   const w = gulp.watch('gulpfile.js')
//   w.on('change', (event) => { console.warn(event.path + '  '+ event.type)})
//   return 'b'
// })
// gulp.task('c', (x) => {
//   console.warn('c')
//   // console.warn('x in c is:' + x)
//   return 'c'
// })
// gulp.task('default', ['a', 'b', 'c'], () =>{
//   console.warn('default')
//   return 'default'
// })
