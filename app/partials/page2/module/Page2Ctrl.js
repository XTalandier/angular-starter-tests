App.controller('Page2Ctrl', ['$rootScope', '$scope', 'Page2Service', function ($rootScope, $scope, Page2Service) {

	$scope.value = 'Click to play';

	$scope.play = function(){
		$scope.value = Page2Service.ping() + (new Date()).toString();
	};

}]);
