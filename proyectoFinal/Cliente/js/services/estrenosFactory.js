myApp.factory('estrenos', ['$http', function($http) {
	return $http.get('movies?Func=filter&Filter=popular')
		.success(function(data) {
			return data;
		})
		.error(function(err) {
			return err;
		});
}]);