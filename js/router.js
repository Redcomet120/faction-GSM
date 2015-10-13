var Backbone = require('backbone');
var ServerList = require('../flux/actions/server-list');

var Router = Backbone.Router.extend({

    routes: {
        "server/list":  "serverList"
    },
    serverList : function(){
        debugger;
        ServerList.getServerlist();
    }
});

Backbone.history.start({pushState:true}),

module.exports = new Router;
