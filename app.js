'use strict';

global.root_require = function(name) {
    return require(__dirname + '/' + name);
};

// Required modules
var express = require('express');
var app = express();
var config = require('./config');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');

// Set Static files directory
app.use('/static/', express.static(__dirname + '/static/'));
// Configure express
app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({ secret: 'baconTech', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

// Create a token cookie for user
passport.serializeUser(function(user, done) {
      done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// Configure passport strategy
passport.use(new LocalStrategy(
    function(usr, pword, done){
        User.findOne({ username: usr }, function (err, user) {
            if(err) { return done(err); }
            if(!user) {
                return done(null, false, { message: 'Incorrect username. '});
            }
            if(!user.validPassword(pword)) {
                return done(null, false, { message: 'Wrong password. '});
            }
            return done(null, user);
        });
    }
));

// Redirects
app.get('/', function(req, res) {
    res.redirect('/login');
});

// Login local auth redirect
app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/dongs',
        failureRedirect: '/login',
        failureFlash: true
    })
);

app.get('/login', function(req, res) {
    var html = __dirname + '/static/login.html';
    res.status(200)
        .set('Content-Type', 'text/html')
        .sendFile(html);
});


app.get('/dongs', function(req, res) {
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
