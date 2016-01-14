var koa = require('koa');
var http = require('http');
var program = require('commander');


program
  .version('0.0.1')
  .option('-d, --develop', 'develop mode')
  .parse(process.argv);

var port = 80;

if (program.develop){
	port = 8080
}

//路由
var route = require('./feature/route');
//静态文件服务器
var staticServer = require('koa-file-server');
//ws
var mywebsocket = require('./feature/socket')

var app = koa();
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

var server = http.createServer(app.callback());
//使用自定义ws
mywebsocket(server);



server.listen(port);

console.info("server is running, listen to " + port)

// node --harmony index.js
// supervisor -e 'node,js,css,less,html' --harmony index.js
// 


// var http = require('http');
// var qs = require('querystring');

// var proxy = http.createServer(function(request, response) {
//   	var getHeader = function (req) {
// 		  var ret = {};
// 		  for (var i in req.headers) {
// 		    if (!/host|connection/i.test(i)) {
// 		      ret[i] = req.headers[i];
// 		    }
// 		  }
// 		  return ret;
// 		};


// 		var body = '';
//     request.on('data', function (data) {
//         body += data;
//         // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
//         if (body.length > 1e6) { 
//             // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
//             request.connection.destroy();
//         }
//     });
//     request.on('end', function () {

//         var POST = qs.parse(body);
//         console.info(body)
        
//         var options = {
// 		        host: 'local.mos.sankuai.com', // 这里是代理服务器       
// 		        port: 8000,             // 这里是代理服务器端口 
// 		        path: request.url,       
// 		        method: request.method,
// 		        headers: getHeader(request)
// 		    };
// 		    if(options.method == 'POST'){
// 		    	options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// 		    	options.headers['Content-Length'] = body.length;
// 			    console.info(options)
// 		    }
		    	
// 		    var req = http.request(options, function(req) {
// 		        req.pipe(response);    // 这个pipe很喜欢
// 		    });
// 		    req.write(body + "\n");
// 		    req.end();
//     });

    



// }).listen(8080);

