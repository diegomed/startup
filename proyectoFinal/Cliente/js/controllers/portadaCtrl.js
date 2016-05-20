myApp.controller('portadaCtrl', ['$scope', 'estrenos', function ($scope, estrenos) {
	estrenos.get('movies?Func=lastmov')
		.success(function(data) {
			$scope.pelis = data;
		});
}]);