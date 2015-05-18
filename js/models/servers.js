var Backbone = require('backbone');

var ServersCollection = Backbone.Collection.extend({
    parse: function(data) {
        return data;
    },
    initialize: function() {
        Backbone.on('getServers', function() {
            this.fetch({
                success: function(collection) {
                    Backbone.trigger('hasServers', collection.toJSON());
                }
            });
        }.bind(this));
    },
    url: function() {
        return 'api/servers';
    }
});

module.exports = ServersCollection;
