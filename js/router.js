var Backbone = require('backbone');
var ServerList = require('../flux/actions/server-list');

var Router = Backbone.Router.extend({

    routes: {
        "servers/list":  "serverList"
    },
    serverList : function(){
        ServerList.getServerList();
    }
});

module.exports = Router;
