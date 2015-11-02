var koa = require('koa');
var app = koa();

//路由
var route = require('./feature/route');
//静态文件服务器
var staticServer = require('koa-file-server');

//打印路径
app.use(function *(next){
  var start = new Date();
  yield next;
  var ms = new Date() - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

//使用静态文件服务器
app.use(staticServer({
	root: __dirname + '/static/'
}));

//使用路由
route(app);

app.listen(8888);
console.info("server is running")

//node --harmony index.js
//supervisor -e 'node,js,css,less,html' --harmony index.js