var _ = require('lodash');
var Backbone = require('backbone');
var Dispatcher = require('../dispatcher');

var ServerListModel = Backbone.Model.extend({
    initialize: function() {
        this.set({
            servers: {}
        });
    }
});
var ServerListStore = new ServerListModel();

Dispatcher.register(function(payload) {
    var action = payload.actionType;
    var data = payload.data;
    var callbacks = {
        hasServers: function(servers) {
            ServerListStore.set({
                servers: servers
            });
        },
        updateStatus: function(data) {
            var servers = _.cloneDeep(ServerListStore.get('servers'));
            servers[data.id].status = data.status;
            ServerListStore.set({
                servers: servers
            });
        },
        updatePlayers: function(data) {
            var servers = _.cloneDeep(ServerListStore.get('servers'));
            servers[data.id].players = data.players;
            ServerListStore.set({
                servers: servers
            });
        }
    };

    callbacks[action](data);
});

module.exports = ServerListStore;
