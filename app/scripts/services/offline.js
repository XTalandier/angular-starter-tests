/**
 * @ngdoc module
 * @name ajaxoffline
 * @module ajaxoffline
 * @description
 *
 * The ajaxoffline module allow you to request a server and add data to cache.
 * When the network turn offline, it return previous call
 *
 * <div doc-module-components="ajaxoffline"></div>
 */
App.factory('$ajaxoffline', ['$http' , '$q', function ($http, $q) {

  var moduleName = '$ajaxoffline';

  var isOffline = false;

  var forced = false;

  function forceConnectionStatus(val) {
    forced = true;
    isOffline = val;
  }

  function restoreAutoCheck() {
    forced = false;
  }

  function checkConnection() {
    isOffline = false;
  }

  /**
   * @ngdoc function
   * @name ajaxoffline.get
   * @module ajaxoffline
   * @kind function
   *
   * @description Execuce a request with the GET verb
   * @param {string} url URL to access
   * @returns {Deferred} Returns a new instance of deferred.
   */
  function get(url) {
    if(!forced){
      checkConnection();
    }

    return isOffline ? getDataWhenOffline(url) : getDataWhenOnline(url);
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
      .then(function (data) {
        def.resolve('aa');
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
  function createStoringKey(verb, url) {
    return verb + '-' + btoa(url);
  }

  /**
   * Store data in the localforage
   * @private
   * @param {string} verb HTTP Verb
   * @param {string} url URL where data was taken
   * @param {Object} data Data retrieved
   */
  function storeData(verb, url, data) {
    var key = createStoringKey(verb, url);
    var value = JSON.stringify(data);

    localforage.setItem(key, value);
  }

  return {
    isOffline: isOffline,
    get: get,
    moduleName: moduleName,
    forceConnectionStatus: forceConnectionStatus,
    restoreAutoCheck: restoreAutoCheck
  };

}]);
