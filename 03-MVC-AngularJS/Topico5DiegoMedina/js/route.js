var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'js/section.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});