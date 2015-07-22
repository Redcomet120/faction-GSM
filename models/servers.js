var Backbone = require('backbone');

var ServersCollection = Backbone.Collection.extend({

    model: Backbone.Model.extend({
        initialize: function() {
            Backbone.on('startServer', function(sid) {
                if(sid !== this.get('sid')) return;
                this.fetch({
                    success: function(model, response) {
                        if(response.status === 'Success') return Backbone.trigger('serverStarted');
                        return Backbone.trigger('failedToStart');
                    },
                    data: { action: 'start' }
                });
            }.bind(this));

            Backbone.on('stopServer', function(sid) {
                if(sid !== this.get('sid')) return;
                this.fetch({
                    success: function() {
                        Backbone.trigger('serverStopped');
                    },
                    data: { action: 'stop' }
                });
            }.bind(this));

            Backbone.on('getPlayers', function(sid) {
                if(sid !== this.get('sid')) return;
                this.fetch({
                    success: function(model, response) {
                        Backbone.trigger('hasPlayers', response.players);
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
