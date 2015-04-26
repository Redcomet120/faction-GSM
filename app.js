'use strict';

global.root_require = function(name) {
	return require(__dirname + '/' + name);
};
//required modules
var express = require('express');
var app = express();

//redirect ??
app.get('/', function(req, res) {
    res.redirect('dongs');
});

// rout to index ? 
app.get('/dongs', function(req, res) {
	var html = __dirname + '/static/index.html';
	res.status(200)
		.set('Content-Type', 'text/html')
		.sendFile(html);
});

//starts the server listening
var server = app.listen(8083, '192.168.1.12');
console.log("its's running on 8080");
/*
var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
*/
module.exports = app;
