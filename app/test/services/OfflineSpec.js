describe('Offline Service', function(){
  var notify;
  //beforeEach(module('app'));
  beforeEach(module('app'));


  var dataURL = '/data.json';

  describe('GET Verb',function() {
    var laDataOnline = null;
    var laDataOffline = null;

    var $ao = null;
    var $rootScope;
    var $httpBackend;

    beforeEach(inject(function($injector){
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', dataURL).respond([{name: "U1"}]);
      $ao = $injector.get('$ajaxoffline');
      $rootScope = $injector.get('$rootScope');
    }));

    /*
    it('should not retrieve data with "GET" verb in OFFLINE mode', function(){
      $ao.forceConnectionStatus(true);
      $ao.get(dataURL).then(function(data){
        laDataOnline = data;
      });

      $rootScope.$apply();
      expect(laDataOffline).toEqual(null);
    });
    */

    it('should retrieve data with "GET" verb in ONLINE mode', function(){
      $ao.forceConnectionStatus(false);
      $ao.get(dataURL).then(function(data){
        laDataOnline = data;
      });

      $httpBackend.flush();

      $rootScope.$apply();
      expect(laDataOnline[0].name).toEqual('U1');

    });

    it('should retrieve the same data than ONLINE mode when OFFLINE', function(){
      $ao.forceConnectionStatus(true);
      $ao.get(dataURL).then(function(data){
        laDataOffline = data;
        console.log("coucou");
      });


      $timeout(function(){
        console.log('aaaa');
      }, 100);
      $rootScope.$apply();
      //console.log(laDataOnline);
      //console.log(laDataOffline);


      expect(laDataOffline).toEqual(laDataOnline);

    });


  });
});


/*

 $ajaxoffline.get('data.json').success(function(data){
 laData = data;
 });

 */
