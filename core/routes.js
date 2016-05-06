var ServerController = require('./server-controller');
var MCController = require('./minecraftController');

// Redirects
module.exports = function(app, passport, io) {
    app.get('/', function(req, res) {
        res.redirect('/login');
    });

    app.post('/api/register', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user) {
            if(err) return next(err);
            if (!user) {
                return res.status(200).send({
                    'status': 'error',
                    'message': 'Failed to register'
                });
            }
            req.logIn(user, function(err) {
                if (err) return next(err);
                res.set('location', '/servers/list');
                return res.status(200).send({
                    'status': 'success',
                    'user': this.username
                });
            }.bind(user));
        })(req, res, next);
     });

    // Login local auth redirect
    app.post('/api/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user) {
            if (err) { return next(err); }
            if (!user) {
                return res.status(200).send({
                    'status': 'error',
                    'message': 'Failed to authenticate'
                });
            }
            req.logIn(user, function(err) {
                if (err) return next(err);
                res.set('location', '/servers/list');
                return res.status(200).send({
                    'status': 'success',
                    'user': this.username
                });
            }.bind(user));
        })(req, res, next);
    });

    app.get('/login', function(req, res) {
        if(req.user) return res.redirect('/servers/list');
        res.render('login');
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });

    app.get('/servers/list', function(req, res) {
        if(!(req.user && req.user.length)) return res.redirect('/login');
        res.render('dongs', {user: req.user[0].username});
    });

    // API for getting the list of servers
    app.get('/api/servers', ServerController.getAll);
    // API for game server actions
    app.get('/api/servers/:id', function(req, res){
        MCController.action(req, res, io);
    });
};
