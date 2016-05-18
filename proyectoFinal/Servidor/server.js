var express = require('express');
var app = express();

app.use(express.static('../Cliente'));

app.listen(process.env.PORT || 3000, function () {
	console.log('server running at port 3000');
});