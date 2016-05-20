myApp.controller('estrenosCtrl', ['$scope', 'estrenos', function ($scope, estrenos) {
	estrenos.get('movies?Func=filter&Filter=recent')
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
}]);