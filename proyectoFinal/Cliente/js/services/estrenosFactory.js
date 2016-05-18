myApp.factory('estrenos', ['$http', function($http) {
	return $http.get('http://localhost:8081/movies?Func=filter&Filter=popular')
		.success(function(data) {
			return data;
		})
		.error(function(err) {
			return err;
		});
}]);