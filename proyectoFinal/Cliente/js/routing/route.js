var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
	$routeProvider
		.when('/portada', {
			templateUrl: 'templates/portada.html',
			controller: 'portadaCtrl'
		})
		.when('/ficha', {
			templateUrl: 'templates/fichaPelicula.html',
			controller: 'fichaCtrl'
		})
		.when('/estrenos', {
			templateUrl: 'templates/estrenos.html',
			controller: 'estrenosCtrl'
		})
		.when('/alta', {
			templateUrl: 'templates/alta.html',
			controller: 'altaCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
});