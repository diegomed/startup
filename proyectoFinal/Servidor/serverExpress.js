var express = require('express');
var url = require('url');
var app = express();

app.use(express.static('../Cliente'));

app.get('/movies', function (req, res) {
   console.log("Got a GET request for the homepage");
   var queryObj = queryToObj(req.url);
   if (queryObj.Func == 'searchmov') {
		var movies = searchMovies(jsonObj, queryObj.Search);
		res.end(JSON.stringify(movies));
	}
	else if (queryObj.Func == 'filter') {
		var movies = filter(jsonObj, queryObj.Filter);
		res.end(JSON.stringify(movies));
	}
	else if (queryObj.Func == 'genre') {
		var movies = movieGenres(jsonObj); //no funciona correctamente, ademas su resultado no me es de utilidad
		res.end(JSON.stringify(movies));
	}
	else if (queryObj.Func == 'lastmov') {
		var movies = lastMovies(jsonObj,3); //creo que no se esta comportando como deberia
		res.end(JSON.stringify(movies));
	}
	else if (queryObj.Func = 'id') {
		var movies = searchByID(jsonObj, queryObj.id);
		res.end(JSON.stringify(movies));
	}
	else if (queryObj == 'err') {
		res.end('noQuery');
	}
});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});

function queryToObj(query) {
	var parsed = url.parse(query);
	if (parsed.query) {
		if (parsed.query.search('&') != -1) {
			var params = parsed.query.split('&');
		}
		else {
			var params = new Array(parsed.query);
		}
		var queryObj = new Array(); //convierto el query en un objeto
		for (x in params) {
			var toObj = params[x].split('=');
			queryObj[toObj[0]] = toObj[1];
		}
		return queryObj;
	}
	else {
		return 'err';
	}
}

function searchMovies(obj,query) {
    var resultado = new Array();
    for (x in obj) {
    	//console.log(obj[x]);
        if ((obj[x].Title.search(query) != -1) || (obj[x].Director.search(query) != -1) || (obj[x].Actors.search(query) != -1)) {
            resultado.push(obj[x]);
        }
    }
    //console.log(resultado);
    return resultado;
}

function filter(obj,filtro) {
	var sorted = obj.slice(0); //esto es para no modificar el objeto original
    if (filtro == 'all') {
        return sorted;
    }
    else if (filtro == 'recent') {
        return sorted.sort(function(a, b){return Number(b.Year)-Number(a.Year)}); // ordeno por año de estreno
    }
    else if (filtro == 'popular') {
        return sorted.sort(function(a, b){return Number(b.imdbRating)-Number(a.imdbRating)}); // ordeno por rating
    }
    else {
        return -1;
    }
}

function movieGenres(obj) {
    var genres = new Array(obj[0].Genre);
    for (x in obj) { // para cada elemento de obj
        for (y in genres) { // verifico si su genero ya esta en genres
            if (genres[y] == obj[x].Genre) {
                genres.splice(y,1,obj[x].Genre); // si esta, lo sobre-escribo por uno identico
                break;
            }
        }
        if ((y == genres.length-1) && (genres[y] != obj[x].Genre)) { // (si se recorrio todo el array genres (sin llegar a break)) && (el elemento a sobre-escribir no era el ultimo)
            genres.splice(y,0,obj[x].Genre); // lo agrego
        }
    }
    return genres;
}

function lastMovies(obj,n) {
    obj.sort(function(a, b){return Number(b.year)-Number(a.year)});
    var lastReleases = obj.slice(0,n);
    return lastReleases;
}

function searchByID(obj,query) {
    var resultado = new Array();
    for (x in obj) {
    	//console.log(obj[x]);
        if (obj[x].imdbID.search(query) != -1) {
            resultado.push(obj[x]);
        }
    }
    //console.log(resultado);
    return resultado;
}

var jsonObj =
[
   {
	    "Title": "Forrest Gump",
	    "Year": "1994",
	    "Rated": "PG-13",
	    "Released": "06 Jul 1994",
	    "Runtime": "142 min",
	    "Genre": "Drama, Romance",
	    "Director": "Robert Zemeckis",
	    "Writer": "Winston Groom (novel), Eric Roth (screenplay)",
	    "Actors": "Tom Hanks, Rebecca Williams, Sally Field, Michael Conner Humphreys",
	    "Plot": "Forrest Gump is a simple man with a low I.Q. but good intentions. He is running through childhood with his best and only friend Jenny. His 'mama' teaches him the ways of life and leaves him to choose his destiny. Forrest joins the army for service in Vietnam, finding new friends called Dan and Bubba, he wins medals, creates a famous shrimp fishing fleet, inspires people to jog, starts a ping-pong craze, creates the smiley, writes bumper stickers and songs, donates to people and meets the president several times. However, this is all irrelevant to Forrest who can only think of his childhood sweetheart Jenny Curran, who has messed up her life. Although in the end all he wants to prove is that anyone can love anyone.",
	    "Language": "English",
	    "Country": "USA",
	    "Awards": "Won 6 Oscars. Another 37 wins & 51 nominations.",
	    "Poster": "http://ia.media-imdb.com/images/M/MV5BMTI1Nzk1MzQwMV5BMl5BanBnXkFtZTYwODkxOTA5._V1_SX300.jpg",
	    "Metascore": "82",
	    "imdbRating": "8.8",
	    "imdbVotes": "1,212,057",
	    "imdbID": "tt0109830",
	    "Type": "movie",
	    "Response": "True"
	},
	{
	    "Title": "Titanic",
	    "Year": "1997",
	    "Rated": "PG-13",
	    "Released": "19 Dec 1997",
	    "Runtime": "194 min",
	    "Genre": "Drama, Romance",
	    "Director": "James Cameron",
	    "Writer": "James Cameron",
	    "Actors": "Leonardo DiCaprio, Kate Winslet, Billy Zane, Kathy Bates",
	    "Plot": "A seventeen-year-old aristocrat falls in love with a kind, but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
	    "Language": "English",
	    "Country": "USA",
	    "Awards": "Won 11 Oscars. Another 109 wins & 73 nominations.",
	    "Poster": "http://ia.media-imdb.com/images/M/MV5BMjExNzM0NDM0N15BMl5BanBnXkFtZTcwMzkxOTUwNw@@._V1_SX300.jpg",
	    "Metascore": "74",
	    "imdbRating": "7.7",
	    "imdbVotes": "773,677",
	    "imdbID": "tt0120338",
	    "Type": "movie",
	    "Response": "True"
	},
	{
	    "Title": "Titanic",
	    "Year": "1997",
	    "Rated": "PG-13",
	    "Released": "19 Dec 1997",
	    "Runtime": "194 min",
	    "Genre": "Drama, Romance",
	    "Director": "James Cameron",
	    "Writer": "James Cameron",
	    "Actors": "Leonardo DiCaprio, Kate Winslet, Billy Zane, Kathy Bates",
	    "Plot": "A seventeen-year-old aristocrat falls in love with a kind, but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
	    "Language": "English",
	    "Country": "USA",
	    "Awards": "Won 11 Oscars. Another 109 wins & 73 nominations.",
	    "Poster": "http://ia.media-imdb.com/images/M/MV5BMjExNzM0NDM0N15BMl5BanBnXkFtZTcwMzkxOTUwNw@@._V1_SX300.jpg",
	    "Metascore": "74",
	    "imdbRating": "7.7",
	    "imdbVotes": "773,677",
	    "imdbID": "tt0120338",
	    "Type": "movie",
	    "Response": "True"
	},
	{
	    "Title": "Gladiator",
	    "Year": "2000",
	    "Rated": "R",
	    "Released": "05 May 2000",
	    "Runtime": "155 min",
	    "Genre": "Action, Drama",
	    "Director": "Ridley Scott",
	    "Writer": "David Franzoni (story), David Franzoni (screenplay), John Logan (screenplay), William Nicholson (screenplay)",
	    "Actors": "Russell Crowe, Joaquin Phoenix, Connie Nielsen, Oliver Reed",
	    "Plot": "Maximus is a powerful Roman general, loved by the people and the aging Emperor, Marcus Aurelius. Before his death, the Emperor chooses Maximus to be his heir over his own son, Commodus, and a power struggle leaves Maximus and his family condemned to death. The powerful general is unable to save his family, and his loss of will allows him to get captured and put into the Gladiator games until he dies. The only desire that fuels him now is the chance to rise to the top so that he will be able to look into the eyes of the man who will feel his revenge.",
	    "Language": "English",
	    "Country": "USA, UK",
	    "Awards": "Won 5 Oscars. Another 53 wins & 101 nominations.",
	    "Poster": "http://ia.media-imdb.com/images/M/MV5BMTgwMzQzNTQ1Ml5BMl5BanBnXkFtZTgwMDY2NTYxMTE@._V1_SX300.jpg",
	    "Metascore": "64",
	    "imdbRating": "8.5",
	    "imdbVotes": "959,769",
	    "imdbID": "tt0172495",
	    "Type": "movie",
	    "Response": "True"
	},
	{
	    "Title": "Braveheart",
	    "Year": "1995",
	    "Rated": "R",
	    "Released": "24 May 1995",
	    "Runtime": "178 min",
	    "Genre": "Biography, Drama, History",
	    "Director": "Mel Gibson",
	    "Writer": "Randall Wallace",
	    "Actors": "James Robinson, Sean Lawlor, Sandy Nelson, James Cosmo",
	    "Plot": "When his secret bride is executed for assaulting an English soldier who tried to rape her, William Wallace begins a revolt against King Edward I of England.",
	    "Language": "English, French, Latin, Scottish Gaelic",
	    "Country": "USA",
	    "Awards": "Won 5 Oscars. Another 26 wins & 29 nominations.",
	    "Poster": "http://ia.media-imdb.com/images/M/MV5BNjA4ODYxMDU3Nl5BMl5BanBnXkFtZTcwMzkzMTk3OA@@._V1_SX300.jpg",
	    "Metascore": "68",
	    "imdbRating": "8.4",
	    "imdbVotes": "718,020",
	    "imdbID": "tt0112573",
	    "Type": "movie",
	    "Response": "True"
	},
	{
	    "Title": "Toy Story",
	    "Year": "1995",
	    "Rated": "G",
	    "Released": "22 Nov 1995",
	    "Runtime": "81 min",
	    "Genre": "Animation, Adventure, Comedy",
	    "Director": "John Lasseter",
	    "Writer": "John Lasseter (original story by), Pete Docter (original story by), Andrew Stanton (original story by), Joe Ranft (original story by), Joss Whedon (screenplay), Andrew Stanton (screenplay), Joel Cohen (screenplay), Alec Sokolow (screenplay)",
	    "Actors": "Tom Hanks, Tim Allen, Don Rickles, Jim Varney",
	    "Plot": "A little boy named Andy loves to be in his room, playing with his toys, especially his doll named \"Woody\". But, what do the toys do when Andy is not with them, they come to life. Woody believes that he has life (as a toy) good. However, he must worry about Andy's family moving, and what Woody does not know is about Andy's birthday party. Woody does not realize that Andy's mother gave him an action figure known as Buzz Lightyear, who does not believe that he is a toy, and quickly becomes Andy's new favorite toy. Woody, who is now consumed with jealousy, tries to get rid of Buzz. Then, both Woody and Buzz are now lost. They must find a way to get back to Andy before he moves without them, but they will have to pass through a ruthless toy killer, Sid Phillips.",
	    "Language": "English",
	    "Country": "USA",
	    "Awards": "Nominated for 3 Oscars. Another 23 wins & 18 nominations.",
	    "Poster": "http://ia.media-imdb.com/images/M/MV5BMTgwMjI4MzU5N15BMl5BanBnXkFtZTcwMTMyNTk3OA@@._V1_SX300.jpg",
	    "Metascore": "92",
	    "imdbRating": "8.3",
	    "imdbVotes": "605,654",
	    "imdbID": "tt0114709",
	    "Type": "movie",
	    "Response": "True"
	},
	{
	    "Title": "Saving Private Ryan",
	    "Year": "1998",
	    "Rated": "R",
	    "Released": "24 Jul 1998",
	    "Runtime": "169 min",
	    "Genre": "Action, Drama, War",
	    "Director": "Steven Spielberg",
	    "Writer": "Robert Rodat",
	    "Actors": "Tom Hanks, Tom Sizemore, Edward Burns, Barry Pepper",
	    "Plot": "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
	    "Language": "Czech, English, German, French",
	    "Country": "USA",
	    "Awards": "Won 5 Oscars. Another 74 wins & 74 nominations.",
	    "Poster": "http://ia.media-imdb.com/images/M/MV5BNjczODkxNTAxN15BMl5BanBnXkFtZTcwMTcwNjUxMw@@._V1_SX300.jpg",
	    "Metascore": "90",
	    "imdbRating": "8.6",
	    "imdbVotes": "857,467",
	    "imdbID": "tt0120815",
	    "Type": "movie",
	    "Response": "True"
	},
	{
	    "Title": "Edward Scissorhands",
	    "Year": "1990",
	    "Rated": "PG-13",
	    "Released": "14 Dec 1990",
	    "Runtime": "105 min",
	    "Genre": "Drama, Fantasy, Romance",
	    "Director": "Tim Burton",
	    "Writer": "Tim Burton (story), Caroline Thompson (story), Caroline Thompson (screenplay)",
	    "Actors": "Johnny Depp, Winona Ryder, Dianne Wiest, Anthony Michael Hall",
	    "Plot": "A gentle man, with scissors for hands, is brought into a new community after living in isolation.",
	    "Language": "English",
	    "Country": "USA",
	    "Awards": "Nominated for 1 Oscar. Another 6 wins & 15 nominations.",
	    "Poster": "http://ia.media-imdb.com/images/M/MV5BOTE2NDExNjQxMF5BMl5BanBnXkFtZTgwMzQ3NzMxMDE@._V1_SX300.jpg",
	    "Metascore": "74",
	    "imdbRating": "7.9",
	    "imdbVotes": "351,658",
	    "imdbID": "tt0099487",
	    "Type": "movie",
	    "Response": "True"
	},
	{
	    "Title": "Back to the Future",
	    "Year": "1985",
	    "Rated": "PG",
	    "Released": "03 Jul 1985",
	    "Runtime": "116 min",
	    "Genre": "Adventure, Comedy, Sci-Fi",
	    "Director": "Robert Zemeckis",
	    "Writer": "Robert Zemeckis, Bob Gale",
	    "Actors": "Michael J. Fox, Christopher Lloyd, Lea Thompson, Crispin Glover",
	    "Plot": "A young man is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his friend, Dr. Emmett Brown, and must make sure his high-school-age parents unite in order to save his own existence.",
	    "Language": "English",
	    "Country": "USA",
	    "Awards": "Won 1 Oscar. Another 18 wins & 26 nominations.",
	    "Poster": "http://ia.media-imdb.com/images/M/MV5BMjA5NTYzMDMyM15BMl5BanBnXkFtZTgwNjU3NDU2MTE@._V1_SX300.jpg",
	    "Metascore": "86",
	    "imdbRating": "8.5",
	    "imdbVotes": "707,816",
	    "imdbID": "tt0088763",
	    "Type": "movie",
	    "Response": "True"
	},
	{
	    "Title": "Monsters, Inc.",
	    "Year": "2001",
	    "Rated": "G",
	    "Released": "02 Nov 2001",
	    "Runtime": "92 min",
	    "Genre": "Animation, Adventure, Comedy",
	    "Director": "Pete Docter, David Silverman, Lee Unkrich",
	    "Writer": "Pete Docter (original story by), Jill Culton (original story by), Jeff Pidgeon (original story by), Ralph Eggleston (original story by), Andrew Stanton (screenplay), Daniel Gerson (screenplay)",
	    "Actors": "John Goodman, Billy Crystal, Mary Gibbs, Steve Buscemi",
	    "Plot": "A city of monsters with no humans called Monstropolis centers around the city's power company, Monsters, Inc. The lovable, confident, tough, furry blue behemoth-like giant monster named James P. Sullivan (better known as Sulley) and his wisecracking best friend, short, green cyclops monster Mike Wazowski, discover what happens when the real world interacts with theirs in the form of a 2-year-old baby girl dubbed \"Boo,\" who accidentally sneaks into the monster world with Sulley one night. And now it's up to Sulley and Mike to send Boo back in her door before anybody finds out, especially two evil villains such as Sulley's main rival as a scarer, chameleon-like Randall (a monster that Boo is very afraid of), who possesses the ability to change the color of his skin, and Mike and Sulley's boss Mr. Waternoose, the chairman and chief executive officer of Monsters, Inc.",
	    "Language": "English",
	    "Country": "USA",
	    "Awards": "Won 1 Oscar. Another 13 wins & 38 nominations.",
	    "Poster": "http://ia.media-imdb.com/images/M/MV5BMTY1NTI0ODUyOF5BMl5BanBnXkFtZTgwNTEyNjQ0MDE@._V1_SX300.jpg",
	    "Metascore": "78",
	    "imdbRating": "8.1",
	    "imdbVotes": "568,338",
	    "imdbID": "tt0198781",
	    "Type": "movie",
	    "Response": "True"
	},
	{
	    "Title": "American History X",
	    "Year": "1998",
	    "Rated": "R",
	    "Released": "20 Nov 1998",
	    "Runtime": "119 min",
	    "Genre": "Crime, Drama",
	    "Director": "Tony Kaye",
	    "Writer": "David McKenna",
	    "Actors": "Edward Norton, Edward Furlong, Beverly D'Angelo, Jennifer Lien",
	    "Plot": "A former neo-nazi skinhead tries to prevent his younger brother from going down the same wrong path that he did.",
	    "Language": "English",
	    "Country": "USA",
	    "Awards": "Nominated for 1 Oscar. Another 4 wins & 13 nominations.",
	    "Poster": "http://ia.media-imdb.com/images/M/MV5BMjMzNDUwNTIyMF5BMl5BanBnXkFtZTcwNjMwNDg3OA@@._V1_SX300.jpg",
	    "Metascore": "62",
	    "imdbRating": "8.6",
	    "imdbVotes": "766,353",
	    "imdbID": "tt0120586",
	    "Type": "movie",
	    "Response": "True"
	},
	{
	    "Title": "300",
	    "Year": "2006",
	    "Rated": "R",
	    "Released": "09 Mar 2007",
	    "Runtime": "117 min",
	    "Genre": "Action, Drama, Fantasy",
	    "Director": "Zack Snyder",
	    "Writer": "Zack Snyder (screenplay), Kurt Johnstad (screenplay), Michael Gordon (screenplay), Frank Miller (graphic novel), Lynn Varley (graphic novel)",
	    "Actors": "Gerard Butler, Lena Headey, Dominic West, David Wenham",
	    "Plot": "King Leonidas of Sparta and a force of 300 men fight the Persians at Thermopylae in 480 B.C.",
	    "Language": "English",
	    "Country": "USA",
	    "Awards": "16 wins & 42 nominations.",
	    "Poster": "http://ia.media-imdb.com/images/M/MV5BMjAzNTkzNjcxNl5BMl5BanBnXkFtZTYwNDA4NjE3._V1_SX300.jpg",
	    "Metascore": "52",
	    "imdbRating": "7.7",
	    "imdbVotes": "597,526",
	    "imdbID": "tt0416449",
	    "Type": "movie",
	    "Response": "True"
	}
];