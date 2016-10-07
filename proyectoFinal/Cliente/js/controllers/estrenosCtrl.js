myApp.controller('estrenosCtrl', ['$scope', 'estrenos', function ($scope, estrenos) {
	estrenos.get('movies?Func=filter&Filter=all')
		.success(function(data) {
			$scope.pelis = data;
		});

	estrenos.get('movies?Func=genre')
		.success(function(data) {
			$scope.genres = data;
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

	$scope.searchByGenre = function() {
		var form = document.getElementById("estrenosForm");
		var elem = form.elements;
		var select = elem[2];
		var index = select.selectedIndex;
		var selectedOne = select[index].value;
		estrenos.get('movies?Func=searchgen&Genre='+selectedOne)
			.success(function(data) {
				$scope.pelis = data;
			});
	};
}]);