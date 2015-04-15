describe('MainCtrl', function(){
  beforeEach(module('app'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('Loading data', function(){
    it('Should load data GET BUTTON', function() {
      var $scope = {};
      var controller = $controller('MainCtrl', { $scope: $scope });
      $scope.loadDataGET();
      setTimeout(function(){
        expect($scope.usersGet.length).not.toEqual(0);

      }, 100);
    });

    it('Should load data POST BUTTON', function() {
      var $scope = {};
      var controller = $controller('MainCtrl', { $scope: $scope });
      $scope.loadDataPOST();
      setTimeout(function(){
        expect($scope.usersPOST.length).not.toEqual(0);

      }, 100);
    });


  });


});


