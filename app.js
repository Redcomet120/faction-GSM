'use strict';

global.root_require = function(name) {
	return require(__dirname + '/' + name);
};

var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.redirect('bacon');
});

app.get('/bacon', function(req, res) {
	var html = __dirname + '/static/index.html';
	res.status(200)
		.set('Content-Type', 'text/html')
		.sendFile(html);
});

var server = app.listen(25565, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = app;
