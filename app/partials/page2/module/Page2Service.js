/**
 * @ngdoc module
 * @name Page2Service
 * @module Page2Service
 * @description
 *
 * The Page2Service module play ping-pong with you
 *
 * <div doc-module-components="Page2Service"></div>
 */
App.factory('Page2Service', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {

	function ping(){
		return 'pong';
	}

	function out(){
		return 'out';
	}

	return {
		ping: ping,
		out: out
	}

}]);
