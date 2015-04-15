App.controller('MainCtrl', ['$scope', '$ajaxoffline', function ($scope, $ajaxoffline) {
  $scope.usersGet = [];
  $scope.usersPost = [];


  $scope.loadDataGET = function () {

    $ajaxoffline.get('data.json').then(dataLoaded);

    function dataLoaded(data) {
      $scope.usersGet = data;
    }

  };

  $scope.loadDataPOST = function () {

    $ajaxoffline.post('data.json', {'aaa': 'bbb', 'ccc': 'ddd'}).then(dataLoaded);

    function dataLoaded(data) {
      $scope.usersPost = data;
    }

  };

  var status = false;

  $scope.switchStatus = function () {
    $ajaxoffline.forceConnectionStatus(!status);
  }


}]);
