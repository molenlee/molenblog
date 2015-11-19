
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

	app.route('/data/:ptype/:type').get(function* (){
		var STATICDATA = require('../data/' + this.params.ptype);
		this.body = {
			code : 200,
			ret : STATICDATA()[this.params.type]
		}
	});

	app.route('/relex/:type').get(function*(){
		var type = this.params.type;
		var result = {};
		switch(type){
			case 'rolling_wheel_result': 
				var STATICDATA = require('../data/relax');
				var rolling_wheels = STATICDATA()['rollingwheel'];
				var random = Math.random();

				for(var i in rolling_wheels){
					var rolling_wheel = rolling_wheels[i];
					if(random < rolling_wheel['random']){
						result= {
							code : 200,
							ret: rolling_wheel
						}
						this.body = result;
						return;
					}
				}
				break;

		}
	});

	app.route('/').get(homePage);
}




















