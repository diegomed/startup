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
			var movies = searchMovies(jsonObj, queryObj.title);//debo ingresarle un array de obj pelicula que obtengo de algun lado
			response.end(JSON.stringify(movies));
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

var jsonObj = [
   {title: 'peli1', year: '2015', director: 'tarantino', actors: 'jackson'},
   {title: 'peli2', year: '2014', director: 'george', actors: 'samuel'},
   {title: 'peli3', year: '2016', director: 'quentin', actors: 'larson'},
];

function searchMovies(obj,query) {
    var resultado = new Array();
    for (x in obj) {
    	//console.log(obj[x]);
        if ((obj[x].title.search(query) != -1) || (obj[x].director.search(query) != -1) || (obj[x].actors.search(query) != -1)) {
            resultado.push(obj[x]);
        }
    }
    console.log(resultado);
    return resultado;
}
// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');