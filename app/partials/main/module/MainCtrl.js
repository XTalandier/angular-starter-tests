App.controller('MainCtrl', ['$rootScope', '$scope', '$ajaxoffline', function ($rootScope, $scope, $ajaxoffline) {
	$scope.usersGet = [];
	$scope.usersPost = [];


	$scope.loadDataGET = function () {

		$ajaxoffline.get('data.json').then(dataLoaded);

		function dataLoaded(data) {
			$scope.usersGet = data;
		}

	};

	$scope.saveData = function () {

		$ajaxoffline.post(
			'save.json',
			{
				'name': $scope.txtname,
				'email': $scope.txtemail
			}
		).then(dataSaved);

		function dataSaved(data) {
			$scope.outputSaved = data;
		}

	};

	var status = $ajaxoffline.getStatus();

	$scope.switchStatus = function () {
		status = !status;
		$ajaxoffline.forceConnectionStatus(status);
	};

	$scope.stateOfLine = $ajaxoffline.getStatus();

	$rootScope.$on('connectionUpdated', function(){
		$scope.stateOfLine = !$ajaxoffline.getStatus();
	});


}]);
