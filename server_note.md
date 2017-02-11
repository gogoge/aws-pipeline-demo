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
