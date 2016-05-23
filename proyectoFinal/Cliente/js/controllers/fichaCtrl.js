myApp.controller('fichaCtrl', ['$scope', '$routeParams', '$http', function ($scope,$routeParams,$http) {
	$http.get('movies?Func=id&id='+$routeParams.imdbID)
		.success(function(data) {
			$scope.ficha = data[0];
		})
}]);