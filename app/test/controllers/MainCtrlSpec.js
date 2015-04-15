describe('MainCtrl', function(){
  beforeEach(module('app'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('Loading data', function(){
    it('Should load data', function() {
      var $scope = {};
      var controller = $controller('MainCtrl', { $scope: $scope });
      $scope.loadData();
      setTimeout(function(){
        expect($scope.users.length).not.toEqual(0);

      }, 100);
    });
  });


});


