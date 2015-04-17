describe('Page2Ctrl', function () {
	beforeEach(module('app'));

	var $controller;
	var $rootScope;

	beforeEach(inject(function (_$controller_, _$rootScope_) {
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
		$rootScope = _$rootScope_;
	}));

	describe('Should be true', function () {
		it('Yes !', function () {
			expect(true).not.toEqual(false);
		});
	});


});


