myApp.controller('estrenosCtrl', ['$scope', 'estrenos', function ($scope, estrenos) {
	estrenos.get('movies?Func=filter&Filter=all')
		.success(function(data) {
			$scope.pelis = data;
		});

	$scope.sendRequest = function(url) {
		estrenos.get(url)
			.success(function(data) {
				$scope.pelis = data;
			});
	};

	$scope.search = '';

	$scope.searchMov = function() {
		estrenos.get('movies?Func=searchmov&Search='+$scope.search)
			.success(function(data) {
				$scope.pelis = data;
			});
	};

	$scope.searchByID = function(id) {
		estrenos.get('movies?Func=id&id='+id)
			.success(function(data) {
				$scope.ficha = data[0];
				console.log($scope.ficha);
			});
	};
}]);