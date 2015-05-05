var Backbone = require('backbone');

var LoginModel = Backbone.Model.extend({
    initialize: function() {
        Backbone.on('login', function(credentials) {
            this.save(credentials);
        }.bind(this));
    },
    url: function() {
        return 'login';
    }
});

module.exports = LoginModel;
