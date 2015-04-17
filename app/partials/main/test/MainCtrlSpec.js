describe('MainCtrl', function () {
	beforeEach(module('app'));

	var $controller;
	var $rootScope;

	beforeEach(inject(function (_$controller_, _$rootScope_) {
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
		$rootScope = _$rootScope_;
	}));

	describe('Loading data', function () {
		it('Should load data GET BUTTON', function () {
			var $scope = {};
			var controller = $controller('MainCtrl', {$scope: $scope});
			$scope.loadDataGET();
			setTimeout(function () {
				expect($scope.usersGet.length).not.toEqual(0);

			}, 100);
		});

		it('Should save data on POST BUTTON', function () {
			var $scope = {};
			var controller = $controller('MainCtrl', {$scope: $scope});
			$scope.saveData();
			$rootScope.$apply();
			expect($scope.outputSaved).not.toEqual('');
		});


	});


});


