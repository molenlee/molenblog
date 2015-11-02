var monk = require('monk');
var wrap = require('co-monk');
var selfDB = monk('localhost/test');

module.exports = function(db){
	var _db = db
	return {
		getClient: function(name){
			return wrap(this.getDB().get(name));
		},
		setDB: function(db){
			_db = db;
			return this;
		},
		getDB: function(){
			_db = _db || selfDB;
			console.info(selfDB)
			return db;
		},
		_insert: function*(dbName, value){
			var client = this.getClient(dbName);
			return yield client.insert(value);
		},
		_delete : function*(dbName, value){
			var client = this.getClient(dbName);
			return yield client.remove(value);
		},
		_update: function*(){
			
		},
		_query: function*(dbName, condition, dealway){
			var client = this.getClient(dbName);
			return yield client.find(condition, dealway);
		}
	}
}


