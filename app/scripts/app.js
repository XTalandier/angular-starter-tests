'use strict';

// Declare app level module which depends on filters, and services
var App = angular.module('app', ['ngSanitize', 'ngResource', 'ui.router']).config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {
	$locationProvider.hashPrefix('!');
	$urlRouterProvider.otherwise("/");

	$stateProvider.state('index', {
		abstract: true,
		views: {
			"navView@": {
				templateUrl: "partials/nav.html"
			},
			"footerView@": {
				templateUrl: "partials/footer.html"
			}
		}
	}).state('main', {
		parent: 'index',
		url: "/", // root route
		views: {
			"@": {
				templateUrl: "partials/main/module/main.html",
				controller: 'MainCtrl'
			}
		}
	}).state('page2', {
		parent: 'index',
		url: "/page2",
		views: {
			"@": {
				templateUrl: "partials/page2/module/page2.html",
				controller: 'Page2Ctrl'
			}
		}
	});

	// Without server side support html5 must be disabled.
	return $locationProvider.html5Mode(false);
}]);
