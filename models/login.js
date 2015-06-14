var Backbone = require('backbone');

var LoginModel = Backbone.Model.extend({
    initialize: function() {
        Backbone.on('login', function(credentials) {
            this.save(credentials, {
                complete: function(resp) {
                    if(resp.status === 200 && resp.responseJSON.status === 'success') {
                        window.location = resp.getResponseHeader('location');
                    }
                }
            });
        }.bind(this));
    },
    url: function() {
        return 'api/login';
    }
});

module.exports = LoginModel;
