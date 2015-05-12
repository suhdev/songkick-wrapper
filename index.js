var request = require('request');
var urls = require('./songkick/urls');
var q = require('q');
var SongKick = function(KEY){
	this.key = KEY;
};

function proxy(fn,ctx){
	var c = ctx || this;
	return function(){
		fn.apply(c,arguments);
	};
}

function functor(fn){
	var def = q.defer();
	if (fn){
		fn(def);
	}
	return def.promise;
}

SongKick.prototype = {
	getEventDetails:function(id,dataType){
		return functor(function(def){
			request({
			method:'GET',
			url:urls.eventDetails(this.key,id,dataType),
				json:true
			},);	
		});
		
	}
};

module.exports = {
	create:function(key){
		return new SongKick(key);
	}
};