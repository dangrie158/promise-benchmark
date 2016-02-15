var q = require('Q');
var bluebird = require('bluebird');
var lie = require('lie');
var rsvp = require('rsvp');
var when = require('when');

var env = require('jsdom').env;
var html = '<html><body><h1>Hello World!</h1><p class="hello">Heya Big World!</body></html>';

// first argument can be html string, filename, or url

//just use q here for its convenience
var deferred = q.defer();

env(html, function(errors, window) {

	var libraries = {}

	var jQuery = require('jquery')(window);

	libraries.q =   {
		asyncResolver: function() {
			var deferred = q.defer();
			setTimeout(function() {
				deferred.resolve(1);
			}, 1);
			return deferred.promise;
		},
		syncResolver: function() {
			var deferred = q.defer();
			deferred.resolve(1);
			return deferred.promise;
		}
	};

	libraries.bluebird = {
		asyncResolver: function() {
			return new bluebird(function(resolve, reject) {
				setTimeout(function() {
					resolve(1);
				}, 1);
			});
		},
		syncResolver: function() {
			return new bluebird(function(resolve, reject) {
				resolve(1);
			});
		}
	};

	libraries.bluebirdDeferred =   {
		asyncResolver: function() {
			var deferred = bluebird.defer();
			setTimeout(function() {
				deferred.resolve(1);
			}, 1);
			return deferred.promise;
		},
		syncResolver: function() {
			var deferred = bluebird.defer();
			deferred.resolve(1);
			return deferred.promise;
		}
	};

	libraries.rsvp = {
		asyncResolver: function() {
			return new rsvp.Promise(function(resolve, reject) {
				setTimeout(function() {
					resolve(1);
				}, 1);
			});
		},
		syncResolver: function() {
			return new rsvp.Promise(function(resolve, reject) {
				resolve(1);
			});
		}
	};

	libraries.native = {
		asyncResolver: function() {
			return new Promise(function(resolve, reject) {
				setTimeout(function() {
					resolve(1);
				}, 1);
			});
		},
		syncResolver: function() {
			return new Promise(function(resolve, reject) {
				resolve(1);
			});
		}
	};

	libraries.lie = {
		asyncResolver: function() {
			return new lie(function(resolve, reject) {
				setTimeout(function() {
					resolve(1);
				}, 1);
			});
		},
		syncResolver: function() {
			return new lie(function(resolve, reject) {
				resolve(1);
			});
		}
	};

	libraries.when = {
		asyncResolver: function() {
			return when.promise(function(resolve, reject) {
				setTimeout(function() {
					resolve(1);
				}, 1);
			});
		},
		syncResolver: function() {
			return when.promise(function(resolve, reject) {
				resolve(1);
			});
		}
	};

	libraries.jQuery =   {
		asyncResolver: function() {

			debugger;
			var deferred = jQuery.Deferred();
			setTimeout(function() {
				deferred.resolve(1);
			}, 1);
			return deferred.promise();
		},
		syncResolver: function() {
			var deferred = jQuery.Deferred();
			deferred.resolve(1);
			return deferred.promise();
		}
	};

	libraries.all = [
		{name: 'q', resolvers: libraries.q},
		{name: 'bluebird', resolvers: libraries.bluebird},
		{name: 'bluebirdDeferred', resolvers: libraries.bluebirdDeferred},
		{name: 'rsvp', resolvers: libraries.rsvp},
		{name: 'native', resolvers: libraries.native},
		{name: 'lie', resolvers: libraries.lie},
		{name: 'when', resolvers: libraries.when},
		{name: 'jQuery', resolvers: libraries.jQuery}
	];

	deferred.resolve(libraries);
});

module.exports = deferred.promise;