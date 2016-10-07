myApp.controller('altaCtrl', ['$scope','estrenos', function ($scope, estrenos) {
	estrenos.get('movies?Func=genre')
		.success(function(data) {
			$scope.genres = data;
		});	
}]);