describe('Offline Service', function () {

  localforage.setDriver(localforage.LOCALSTORAGE);

  //beforeEach(module('app'));
  beforeEach(module('app'));


  var dataURL = '/data.json';

  describe('GET Verb', function () {
    var laDataOnline = null;
    var laDataOffline = null;

    var $ao;
    var $rootScope;
    var $httpBackend;
    var $q;
    var deferred;

    beforeEach(inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', dataURL).respond([{name: "U1"}]);

      $ao = $injector.get('$ajaxoffline');
      $rootScope = $injector.get('$rootScope');
      $q = $injector.get('$q');

    }));

    it('should not retrieve data with "GET" verb in OFFLINE mode', function () {
      $ao.forceConnectionStatus(true);
      $ao.get(dataURL).then(function (data) {
        laDataOnline = data;
        console.log("XX");
      });

      $rootScope.$apply();
      expect(laDataOffline).toEqual(null);
    });

    it('should retrieve data with "GET" verb in ONLINE mode', function () {
      $ao.forceConnectionStatus(false);
      $ao.get(dataURL).then(function (data) {
        laDataOnline = data;
      });

      $httpBackend.flush();

      $rootScope.$apply();
      expect(laDataOnline[0].name).toEqual('U1');

    });

    it('should retrieve the same data than ONLINE mode when OFFLINE', function () {
      deferred = $q.defer();
      deferred.resolve('get');
      spyOn($ao, 'get').and.returnValue(deferred.promise);

      $ao.forceConnectionStatus(true);
      $ao.get(dataURL).then(function (data) {
        laDataOffline = data;
      });

      $rootScope.$apply();

      expect(laDataOffline).not.toEqual(null);
    });


  });

  describe('POST Verb', function () {
    var laDataOnline = null;
    var laDataOffline = null;

    var $ao;
    var $rootScope;
    var $httpBackend;
    var $q;
    var deferred;

    beforeEach(inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('POST', dataURL).respond([{name: "U1"}]);

      $ao = $injector.get('$ajaxoffline');
      $rootScope = $injector.get('$rootScope');
      $q = $injector.get('$q');

    }));

    it('should not retrieve data with "POST" verb in OFFLINE mode', function () {
      $ao.forceConnectionStatus(true);
      $ao.post(dataURL, {foo: 'bar'}).then(function (data) {
        laDataOnline = data;
      });

      $rootScope.$apply();
      expect(laDataOffline).toEqual(null);
    });

    it('should retrieve data with "POST" verb in ONLINE mode', function () {
      $ao.forceConnectionStatus(false);
      $ao.post(dataURL, {foo: 'bar'}).then(function (data) {
        laDataOnline = data;
      });

      $httpBackend.flush();

      $rootScope.$apply();
      expect(laDataOnline[0].name).toEqual('U1');

    });

    it('should retrieve the same data than ONLINE mode when OFFLINE', function () {
      deferred = $q.defer();
      deferred.resolve('post');
      spyOn($ao, 'post').and.returnValue(deferred.promise);

      $ao.forceConnectionStatus(true);
      $ao.post(dataURL, {foo: 'bar'}).then(function (data) {
        laDataOffline = data;
      });

      $rootScope.$apply();

      expect(laDataOffline).not.toEqual(null);
    });


  });

});
