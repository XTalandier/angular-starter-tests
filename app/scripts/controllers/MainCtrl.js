App.controller('MainCtrl', ['$rootScope', '$scope', '$ajaxoffline', function ($rootScope, $scope, $ajaxoffline) {
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

	var status = $ajaxoffline.getStatus();

	$scope.switchStatus = function () {
		status = !status;
		$ajaxoffline.forceConnectionStatus(status);
	};

	$scope.stateOfLine = $ajaxoffline.getStatus();

	$rootScope.$on('connectionUpdated', function(){
		$scope.stateOfLine = $ajaxoffline.getStatus();
	});


}]);
