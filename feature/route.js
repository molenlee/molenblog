
var dao = require('./dao');
var fs = require('fs');
var path = require('path');

var pageCache = {};
var homePage = function*() {
	this.response.set('content-type','text/html;charset=utf-8');
	if(pageCache.homePage) {
		this.body = pageCache.homePage;
	}
	else{
		var data = fs.readFileSync(path.join(__dirname,'../index.html'));
		pageCache.homePage = data;
		this.body = data;
	}
};

module.exports = function(app){
	app.use(require('koa-trie-router')(app));

	//具体某个类型的某个api
	app.route('/api/:type/:id').get(function* (next){
		var name = this.params.type;
		var id = this.params.id;
		dao().getDB();
		this.body = "hello co"
	}).post(function* (){

	});

	//某一类型
	app.route('/api/:type').get(function* (){
		
	});

	app.route('/').get(homePage);
}




















