var http = require('http');
var url = require('url');

var server = http.createServer(function (request, response) {
	if (request.method == 'GET') {
		var parsed = url.parse(request.url);
		if (parsed.pathname.search('/movies') != -1) {
			var params = parsed.query.split('&');
			var queryObj = new Array(); //convierto el query en un objeto
			for (x in params) {
				var toObj = params[x].split('=');
				queryObj[toObj[0]] = toObj[1];
			}
			var movies = searchMovies(queryObj, 'tarantino');
			response.end(movies);
			/*for (x in queryObj) {
				console.log(queryObj[x]);
			}*/
		}
		else {
			response.end('no estamos en el pathname movies');
		}
	}
});

server.listen(8081);

function searchMovies(JSON,query) {
    var resultado = new Array();
    for (x in JSON) {
        if ((JSON[x].title.search(query) != -1) || (JSON[x].director.search(query) != -1) || (JSON[x].actors.search(query) != -1)) {
            resultado.push(JSON[x]);
        }
    }
    return resultado;
}
// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');