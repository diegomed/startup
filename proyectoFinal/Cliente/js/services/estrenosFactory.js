myApp.factory('estrenos', ['$http', function($http) {
	return {
	    get: function(url) {
	      return $http.get(url);
	    }
    };
}]);