'use strict';

global.root_require = function(name) {
    return require(__dirname + '/' + name);
};

// Required modules
var express = require('express');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var config = require('./config');

// Set Static files directory
app.use('/static/', express.static(__dirname + '/static/'));

// Configure express
app.use(logger('combined'));
app.use(cookieParser('secret'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({
    secret: 'baconTech',
    saveUninitialized: true,
    resave: true,
    cookie:{ maxAge: 60000}}));
app.use(passport.initialize());
app.use(passport.session());

require('./core/auth')(passport);

// Redirects
app.get('/', function(req, res) {
    res.redirect('/login');
});

// Login local auth redirect
app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
        if (err) { return next(err) }
        if (!user) {
            return res.redirect('/login')
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/dongs');
        });
    })(req, res, next);
});

app.get('/login', function(req, res) {
    if(req.user) return res.redirect('/dongs');
    var html = __dirname + '/static/login.html';
    res.status(200)
        .set('Content-Type', 'text/html')
        .sendFile(html);
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});

app.get('/dongs', function(req, res) {
    if(!req.user) return res.redirect('/login');
    var html = __dirname + '/static/index.html';
    res.status(200)
        .set('Content-Type', 'text/html')
        .sendFile(html);
});

// Starts the server listening
var server = app.listen(config.port, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Dongs are listening at http://%s:%s', host, port);
});

module.exports = app;
