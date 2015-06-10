var Backbone = require('backbone');

var ServersCollection = Backbone.Collection.extend({

    model: Backbone.Model.extend({
        initialize: function() {
            Backbone.on('startServer', function(sid) {
                if(sid !== this.get('sid')) return;
                this.fetch({
                    success: function(model) {
                        Backbone.trigger('serverStarted', model.toJSON());
                    },
                    data: { action: 'start' }
                });
            }.bind(this));

            Backbone.on('stopServer', function(sid) {
                if(sid !== this.get('sid')) return;
                this.fetch({
                    success: function(model) {
                        Backbone.trigger('serverStopped', model.toJSON());
                    },
                    data: { action: 'stop' }
                });
            }.bind(this));

            Backbone.on('getPlayers', function(sid) {
                if(sid !== this.get('sid')) return;
                this.fetch({
                    success: function(model) {
                        debugger;
                        Backbone.trigger('hasPlayers', model.toJSON());
                    },
                    data: { action: 'players' }
                });
            }.bind(this));
        },
        url: function() {
            return 'api/servers/' + this.get('sid');
        }
    }),
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
