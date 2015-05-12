'use strict';

var Backbone = require('backbone');

var Router = Backbone.Router.extend({
    routes: {
        '/': 'login',
        '/login': 'login',
        '/dongs': 'dongs'
    }
});

Router.on('login', function() {

});

Router.on('dongs', function() {

});

module.exports = Router;
