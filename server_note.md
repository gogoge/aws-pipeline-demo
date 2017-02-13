# Server筆記

1. webpack產生的bundle file，要以koa static去取得
2. koa static的原理是將`真實路徑`都掛到`/`上
3. 若要mapping到其他路徑，要再加裝`koa-mount`

## koa static opts

```
{
  maxage: ,//browser中的response cache-control，預設為`0`，單為`ms`，但在chrome上看單位是`s`
  hidden: ,//看起來是設定可否傳`.*`的`隱藏檔` defaults to false
  index: ,//Default file name, defaults to 'index.html'
  defer: ,//If true, serves after return next(), allowing any downstream middleware to respond first.
  gzip: ,//Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with .gz extension exists. defaults to true.
  extensions: ,//Try to match extensions from passed array to search for file when no extension is sufficed in URL. First found is served. (defaults to false)

}
```

> 找資料瞭解defer的用途，最好能以devTool呈現


dev server
方法一
在`server.js`開啟時，判斷是不是dev env, 啟動`webpack-dev-middleware` / `webpack-hot-middleware`及相關HMR的設定
HMR的middleware需要bundle後的結果，以這個方法可以用變數的方式取得
並以browsersync，啟用proxy server
以上都在server.js完成

方法二
在webpack中browser sync，`webpack plugin`
問題-> 如何將webpack-dev-middleware與webpack中的browser sync結合
想法-> hot-middleware/ dev-middleware仍寫在server.js，只是將bs移至webpack啟動

方法三
由gulp的方式啟動bs及server.js


> decorator error
babel-plugin-transform-decorators-legacy
# gulp 
http://russmatney.com/techsposure/basic-koa-api-gulp-supertest/
http://coderlt.coding.me/2016/09/01/velocity-koa-gulp/

gulp.task及gulp.watch的sample code
```
gulp.task('a', () => {
  console.warn('a')
})
gulp.task('b', () => {
  console.warn('b')
  const w = gulp.watch('gulpfile.js')
  w.on('change', (event) => { console.warn(event.path + '  '+ event.type)})
})
gulp.task('c', () => {
  console.warn('c')
})
gulp.task('default', ['a', 'b', 'c'], () =>{
  console.warn('default')
})

> gulp 4.0
yarn add 'gulpjs/gulp.git#4.0' --dev

新增功能：可以原生sync執行task
```

https://gulp.readme.io/docs/understanding-streams
https://segmentfault.com/a/1190000003770541
https://fe.ele.me/tong-guo-yuan-ma-jie-xi-node-js-zhong-yi-ge-wen-jian-bei-require-hou-suo-fa-sheng-de-gu-shi/

gulp要知道server已啟動，要用gulp-nodemon去開，將stdout關掉
接著用event listener聽stdout，再檢查是否有server ready的字串，才算完成

gulp不要require server.js不然會直接啟動(因為server.js都是寫在global scope)

# server.js 的router修改後browser沒辦法馬上顯示，原因還不曉得，只好暫時獨立成html

> transform-class-properties
裝了才能認得react class中的state = {} 的寫法

> redux作者覺得不必用他寫的react-hot-loader如果是用redux的話
> 因為react local state很少需要保留，只要保留redux store state就夠了
https://github.com/reactjs/redux/pull/1455
https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf#.mny2j06lk

> 結論，不用`react-hot-loader@3`，作者說用原生的HMR API

---
# babel-plugin-react-css-modules

https://github.com/gajus/babel-plugin-react-css-modules/blob/master/demo/webpack.config.js

注意事項
1. context 是目前位置一定要設定
2. 仍然是用styleName存取css

> yarn add css-loader style-loader babel-plugin-react-css-modules --dev

# saga 
>  regeneratorRuntime is not defined with redux-sagas
http://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined-with-async-await
要安裝`babel-polyfill`，在webpack.config.js中的entry 加入 `babel-polyfill`

簡單的非同步

1. store.js
- 用`redux-saga`的`createSagaMiddleware`產生sagamiddleware
- 用`redux`的applyMiddleware，將前者加入redux store
- 用`redux-saga`的`run`去執行要跑的saga task

```
const sagaMiddleware = createSagaMiddleware()
const reducer = combineReducers({ mainReducer }) //與saga無關
export const store = createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(mainSagas.watchAsyncLoad)
```

2. 被執行的saga task 可以直接發生，也可以利用`redux-saga`提供的`effects`去等待`action`發生

```
function* asyncLoad() {
  yield delay(3000)
  yield put({ type: ACTION_TYPES.INCREASE })
}

function* watchAsyncLoad() {
  yield takeEvery(ACTION_TYPES.ASYNC_LOAD, asyncLoad)
}
```
> 當`ASYNC_LOAD`發生時，執行`asyncLoad` saga, 等待3秒後，再觸發`INCREASE` action

原本 `event` -> `action creator` -> `reducer` -> `store`

用saga 
`takeEvery`的用途: 當某`action`發生時，執行某`task`
task內再以`put`去啟動下一個action

定義好一連串的連續動作於task後，用`run`去跑listener task
`event` -> `active action creator` -> `reducer` -> `store`
當listener task被觸發，就會回頭以`put`，去啟動連續的actions
