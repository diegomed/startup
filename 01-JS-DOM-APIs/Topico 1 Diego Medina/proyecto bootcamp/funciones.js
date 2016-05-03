$(function() {
	//PARTE 1 devuelve un objeto con partes de codigo html
    var insertMovie = function(movie) {
        var htmlCode = {
            image: '<img src="'+movie.poster+'" width="25%">',
            poster: '<img src="'+movie.poster+'" width="70%" class="portada">',
            title: '<h1>'+movie.title+'</h1>',
            description: '<p>'+movie.plot+'</p>'
        }
        return htmlCode;
    //PARTE 2
    //PUNTO 1 devuelve los ultimos n estrenos
    /*-----------ESTO FUE BASTANTE ESTUPIDO--------*/
    var lastMoviez = function(JSON,n) {
        var count = 0;
        var posicion = 0;
        var year = new Array();
        for (x in JSON) { // creo un array con los años de estreno de los objetos JSON en el mismo orden que se encuentran
        	var date = new Date(JSON[x].released);
            var year[x] = date.getFullYear();
        }
        var sorted = new Array();
        for (i=0; sorted.length < n; i++) { // armo un array nuevo con los objetos JSON ordenados por año
        	if (sorted.length == 0) {
                sorted[0] = JSON[0];
            }
            else {
                for (y in sorted) { // calculo la posicion donde debe ir el elemento i
                    var dateSorted = new Date(sorted[y].released);
                    var yearSorted = dateSorted.getFullYear();
                    if (year[i] <= yearSorted) {
                        count++;
                    }
                }
                posicion = count;
                count = 0;
            }
            sorted.splice(count,1,JSON[i]);
        }
        var lastReleases = sorted.slice(0,n);
        return lastReleases;
    }
    /*-----------ESTO FUE BASTANTE ESTUPIDO--------*/

    /*-----------ESTO ES MAS OPTIMO--------*/
    function lastMovies(JSON,n) {
        JSON.sort(function(a, b){return Number(b.year)-Number(a.year)});
        var lastReleases = JSON.slice(0,n);
        return lastReleases;
    }
    /*-----------ESTO ES MAS OPTIMO--------*/
    //PUNTO 3 devuelve todos los generos de las peliculas existentes
    function movieGenres(JSON) {
        var genres = new Array(JSON[0].genre);
        for (x in JSON) { // para cada elemento de JSON
            for (y in genres) { // verifico si su genero ya esta en genres
                if (genres[y] == JSON[x].genre) {
                    genres.splice(y,1,JSON[x].genre); // si esta, lo sobre-escribo por uno identico
                    break;
                }
            }
            if ((y == genres.length-1) && (genres[y] != JSON[x].genre)) { // (si se recorrio todo el array genres (sin llegar a break)) && (el elemento a sobre-escribir no era el ultimo)
                genres.splice(y,0,JSON[x].genre); // lo agrego
            }
        }
        return genres;
    }
    //PUNTO 4 devuelve todas las películas dado un texto (buscar en titulo, actor, director)
    function searchMovies(JSON,search) {
        var resultado = new Array();
        for (x in JSON) {
            if ((JSON[x].title.search(search) != -1) || (JSON[x].director.search(search) != -1) || (JSON[x].actors.search(search) != -1)) {
                resultado.push(JSON[x]);
            }
        }
        return resultado;
    }
});