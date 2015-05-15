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

var sendRequest = function(url){
	var def = q.defer();
	request({url:url,json:true},function(err,response,body){
	
		if (!err && response.statusCode == 200){
			def.resolve(body);
			return;
		}
		def.reject('Network error has occured');
	});
	return def.promise;
}

function scs(e){
	if (e && e.resultsPage && e.resultsPage.results){
		return e.resultsPage;
	}
	return {};
}

function err(e){
	return e;
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
		return sendRequest(urls.eventDetails(this.key,id,dataType))
			.then(scs,err);
	},
	getArtistUpcomingEvents:function(id,dataType,createdAfter,page,order){
		return sendRequest(urls.artistUpcoming(this.key,id,dataType,createdAfter,page,order))
			.then(scs,err);
	},
	getArtistUpcomingEventsUsingMusicBrainz:function(id,dataType,createdAfter,page,order){
		return sendRequest(urls.artistUpcomingMusicBrainz(this.key,id,dataType,createdAfter,page,order))
			.then(scs,err);
	},
	getVenueUpcomingEvents:function(id,dataType,createdAfter,page,order){
		return sendRequest(urls.venueUpcoming(this.key,id,dataType,createdAfter,page,order))
			.then(scs,err);
	},
	getMetroAreaUpcomingEvents:function(id,dataType,createdAfter,page,order){
		return sendRequest(urls.metroAreaUpcoming(this.key,id,dataType,createdAfter,page,order))
			.then(scs,err);
	},
	getUserUpcomingEvents:function(username,reason,dataType,createdAfter,page,order){
		return sendRequest(urls.userUpcoming(this.key,username,reason,dataType,createdAfter,page,order))
			.then(scs,err);
	},
	getUserUpcomingEventsAttendance:function(username,dataType,createdAfter,page,order){
		return sendRequest(urls.userUpcomingAttendance(this.key,username,dataType,createdAfter,page,order))
			.then(scs,err);
	},
	getUserUpcomingTrackedArtist:function(username,dataType,createdAfter,page,order){
		return sendRequest(urls.userUpcomingTrackedArtist(this.key,username,dataType,createdAfter,page,order))
			.then(scs,err);
	},
	getUserPastEvents:function(username,dataType,page,order){
		return sendRequest(urls.userPastEvents(this.key,username,dataType,page,order))
			.then(scs,err);
	},
	getUserEvents:function(username,dataType,createdAfter,page,order){
		return sendRequest(urls.userEvents(this.key,username,dataType,createdAfter,page,order))
			.then(scs,err);
	},
	getArtistPastEvents:function(id,dataType,page,order){
		return sendRequest(urls.artistPastEvents(this.key,id,dataType,page,order))
			.then(scs,err);
	},
	getArtistPastEventsUsingMusicBrainz:function(id,dataType,page,order){
		return sendRequest(urls.artistPastEventsMusicBrainz(this.key,id,dataType,page,order))
			.then(scs,err);	
	},
	getVenueDetails:function(id,dataType){
		return sendRequest(urls.venueDetails(this.key,id,dataType))
			.then(scs,err);
	},
	getEventsSetList:function(id,dataType,page,order){
		return sendRequest(urls.eventSetList(this.key,id,dataType,page,order))
			.then(scs,err);
	},
	getSimilarArtists:function(id,dataType){
		return sendRequest(urls.similarArtists(this.key,id,dataType))
			.then(scs,err);
	},

};

module.exports = {
	create:function(key){
		return new SongKick(key);
	},
	mock:{
		setRequestFn:function(fn){
			sendRequest = fn;
		}
	}
};