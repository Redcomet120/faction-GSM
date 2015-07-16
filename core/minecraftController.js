var Q = require('q');
var minecraftDriver = require('./minecraftDriver');
var serverDBController = require('./mysql-Driver');
var servers = [];

var actions = {
    //Start Server
    start: function(id){
        var deferred = Q.defer();
        if(!server[id]) {
            var serverData = JSON.parse(serverDBController.getServerData(id));
            servers[id] = new minecraftDriver.Server(
                serverData.serverDir,
                serverData.serverJar,
                null
            );
            servers[id].start(function(){
                console.log("starting server: "+id);
            });
        } else {
            console.log("Server "+id+" is already running");
        }
        return deferred.promise;
    },
    stop: function(id){
        if(!server[id]){
            console.log("Server "+id+" is not running");
            return;
        }
        server[id].stop();
    }
}
module.exports = actions;

