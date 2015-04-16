/**
 * @ngdoc module
 * @name $ajaxoffline
 * @module $ajaxoffline
 * @description
 *
 * The $ajaxoffline module allow you to request a server and add data to cache.
 * When the network turn offline, it return previous call
 *
 * <div doc-module-components="$ajaxoffline"></div>
 */
App.factory('$ajaxoffline', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {

	window.addEventListener('online', updateOnlineStatus);
	window.addEventListener('offline', updateOnlineStatus);

	var moduleName = '$ajaxoffline';

	var isOffline = !navigator.onLine;

	var forced = false;

	function updateOnlineStatus() {
		checkConnection();
		$rootScope.$broadcast('connectionUpdated', {offline: isOffline});

	}

	function getStatus(){
		if (!forced) {
			checkConnection();
		}

		return isOffline;
	}

	/**
	 * @ngdoc
	 * @name $ajaxoffline.forceConnectionStatus
	 * @module $ajaxoffline
	 * @kind function
	 *
	 * @description Force connection status. False: Online, True: Offline
	 * @param {Boolean} status Connection status. False: Online, True: Offline
	 */
	function forceConnectionStatus(status) {
		forced = true;
		isOffline = status;
		$rootScope.$broadcast('connectionUpdated', {offline: isOffline});
	}

	/**
	 * @ngdoc
	 * @name $ajaxoffline.restoreAutoCheck
	 * @module $ajaxoffline
	 * @kind function
	 *
	 * @description Restore to the auto check of connection status
	 */
	function restoreAutoCheck() {
		forced = false;
	}

	/**
	 * @ngdoc function
	 * @name $ajaxoffline.checkConnection
	 * @module $ajaxoffline
	 * @kind function
	 *
	 * @description Check if network is enabled
	 * @returns {Boolean} True if online, false if offline
	 */
	function checkConnection() {
		isOffline = !navigator.onLine;
	}

	/**
	 * @ngdoc function
	 * @name $ajaxoffline.get
	 * @module $ajaxoffline
	 * @kind function
	 *
	 * @description Execute a request with the GET verb
	 * @param {string} url URL to access
	 * @returns {Deferred} Returns a new instance of deferred.
	 */
	function get(url) {
		if (!forced) {
			checkConnection();
		}

		return isOffline ? getDataWhenOffline(url) : getDataWhenOnline(url);
	}

	/**
	 * @ngdoc function
	 * @name $ajaxoffline.post
	 * @module $ajaxoffline
	 * @kind function
	 *
	 * @description Execuce a request with the POST verb
	 * @param {string} url URL to access
	 * @returns {Deferred} Returns a new instance of deferred.
	 */
	function post(url, params) {
		if (!forced) {
			checkConnection();
		}

		return isOffline ? postDataWhenOffline(url, params) : postDataWhenOnline(url, params);
	}


	/**
	 * $http execution
	 * @private
	 * @param url
	 * @returns {promise.promise|Function|*|jQuery.promise|deferred.promise|{then, catch, finally}}
	 */
	function getDataWhenOnline(url) {
		var def = $q.defer();
		$http.get(url)
			.success(function (data) {
				storeData('get', url, data);
				def.resolve(data);
			}).error(function () {
				def.reject("Error in [GET][ONLINE] " + url);
			});

		return def.promise;
	}

	/**
	 * retrieve stored data
	 * @private
	 * @param url
	 * @returns {promise.promise|Function|*|jQuery.promise|deferred.promise|{then, catch, finally}}
	 */
	function getDataWhenOffline(url) {
		var key = createStoringKey('get', url);
		var def = $q.defer();
		localforage.getItem(key)
			.then(function (data, xx) {
				def.resolve(JSON.parse(data), xx);
			});

		return def.promise;
	}


	/**
	 * $http execution
	 * @private
	 * @param url
	 * @returns {promise.promise|Function|*|jQuery.promise|deferred.promise|{then, catch, finally}}
	 */
	function postDataWhenOnline(url, params) {
		var def = $q.defer();
		$http.post(url, params)
			.success(function (data) {
				//storeData('post', url, data, params);
				def.resolve({
					online: true,
					data: data
				});
			}).error(function () {
				def.reject("Error in [POST][ONLINE] " + url);
			});

		return def.promise;
	}

	/**
	 * retrieve stored data
	 * @private
	 * @param url
	 * @returns {promise.promise|Function|*|jQuery.promise|deferred.promise|{then, catch, finally}}
	 */
	function postDataWhenOffline(url, params) {
		var key = createStoringKey('post', url, params);
		var def = $q.defer();
		var data2save = {
			verb: 'post',
			url: url,
			params: params,
			date: new Date()
		};

		storeData('post', url, data2save, params)
			.then(function(){
				def.resolve({
					online: false,
					data: null
				});
			});

		return def.promise;
	}


	/**
	 * Return a conventional key for localforage
	 * @private
	 * @param {string} verb HTTP Verb
	 * @param {string} url URL where data was taken
	 * @returns {string}
	 */
	function createStoringKey(verb, url, params) {
		return verb + '|' + btoa(url) + '|' + JSON.stringify(params);
	}

	/**
	 * Store data in the localforage
	 * @private
	 * @param {string} verb HTTP Verb
	 * @param {string} url URL where data was taken
	 * @param {Object} data Data retrieved
	 */
	function storeData(verb, url, data, params) {
		var key = createStoringKey(verb, url, params);
		var value = JSON.stringify(data);
		//console.log('KEY=' + key);
		//console.log('VALUE=' + value);
		return localforage.setItem(key, value);
	}

	return {
		isOffline: isOffline,
		get: get,
		post: post,
		moduleName: moduleName,
		forceConnectionStatus: forceConnectionStatus,
		restoreAutoCheck: restoreAutoCheck,
		checkConnection: checkConnection,
		getStatus: getStatus
	};

}]);
