App.controller('MainCtrl', ['$scope', '$ajaxoffline', function ($scope, $ajaxoffline) {
  $scope.loadData = function () {

    $scope.users = [];

    $ajaxoffline.get('data.json').then(dataLoaded);

    function dataLoaded(data){
      $scope.users = data;
    }

  };


}]);
