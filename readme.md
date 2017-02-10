# Koa boilerplate
===

features (todo)
- eslint
- browsersync monitor and rebuild the source code
- universal react.js
  - pre-fetch in server side
  - integrate the router of frontend and backend


use package
- koa@2
- webpack@2.2

# package explain

1. webpack-dev-middleware

用來將webpack config compile後的bundle餵給原有node.js server (我們使用koa@2)
當webpack.config.js的entry有修改，webpack會重build，並且server會重啟
`但browser`不會自動更新
