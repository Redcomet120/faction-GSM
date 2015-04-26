'use strict';

global.root_require = function(name) {
    return require(__dirname + '/' + name);
};
//required modules
var express = require('express');

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var app = express();

//Configure
passport.use(new LocalStrategy(
        function(usr, pword, done){
            User.findOne({ username: usr }, function (err, user) {
                if(err){ return done(err);}
                if(!user){
                    return done(null, false, { message: 'Incorrect username. '});
                }
                if(!user.validPassword(pword)){
                    return done(null, false, { message: 'Wrong password. '});
                }
                return done(null, user);
            });
        }));

//redirect ??
app.get('/', function(req, res) {
    res.redirect('login');
});

// login local auth redirect
app.post('/login',
    passport.authenticate('local'),
        {sucessRedirect: '/',
        failureRedirect: '/login',
    failureFlash: true})
);

// route to index ?
app.get('/dongs', function(req, res) {
    var html = __dirname + '/static/index.html';
    res.status(200)
    .set('Content-Type', 'text/html')
    .sendFile(html);
});

//starts the server listening
var server = app.listen(8083, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = app;
