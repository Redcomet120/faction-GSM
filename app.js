global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
};

// Required modules
var express = require('express');
var app = express();
var passport = require('passport');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var config = require('./config/config');
var dev;

try {
    dev = require('./config/dev-config');
} catch (e) {
    dev = {};
}

// Set Static files directory
app.use('/static/', express.static('static'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// Configure express
app.use(logger('combined'));
app.use(cookieParser('secret'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session());

require('./core/auth')(passport);
require('./core/routes')(app, passport);

var server = app.listen(dev.port, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Dongs are listening at http://%s:%s', host, port);
});

module.exports = app;
