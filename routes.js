'use strict';

var Backbone = require('backbone');

var ServerDBController = require('./core/mysql-Driver');

// Redirects
module.exports = function(app, passport) {
    app.get('/', function(req, res) {
        res.redirect('/login');
    });

    // Login local auth redirect
    app.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) { return next(err) }
            if (!user) {
                return res.status(304).end();
            }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                res.set('location', '/dongs');
                return res.end();
            });
        })(req, res, next);
    });

    app.get('/login', function(req, res) {
        if(req.user) return res.redirect('/dongs');
        res.render('init/login');
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });

    app.get('/dongs', function(req, res) {
        if(!req.user) return res.redirect('/login');
        res.render('init/dongs');
    });

    app.get('/api/servers', ServerDBController.getAll);
};
