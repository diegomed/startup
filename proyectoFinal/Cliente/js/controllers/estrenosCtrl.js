myApp.controller('estrenosCtrl', ['$scope', 'estrenos', function ($scope, estrenos) {
	estrenos.success(function(data) {
		$scope.pelis = data;
	});
}]);