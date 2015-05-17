'use strict';

var Backbone = require('backbone');

var Router = Backbone.Router.extend({
    routes: {
        '/dongs': 'dongs',
        '*': 'login'
    }
});

Router.on('route:login', function() {

});

Router.on('route:dongs', function() {

});

Backbone.history.start();

module.exports = Router;
