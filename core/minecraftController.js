var _ = require('lodash');
var exec = require('child_process');
var Q = require('q');
var serverProcesses = {};
var serverData = {
    backupDir: null,
    serverDir: "Vanila",
    serverJar: "minecraft_server.1.8.7.jar",
    logDir: "null",
    bannedIps: "null",
    bannedPlayers:  "null",
    whitelist: "null",
    opList: "null",
    properties: "server.properties",
    worldDir: "world"
};

var actions = {
    // Start Server
    start: function(id) {
        var deferred = Q.defer();
        if(!serverProcesses[id]) {
            //TODO: log the launch of the server ?
            serverProcesses[id] = exec.execFile(
                "java",
                ['-Xms512M', '-Xmx512M', '-jar', serverData.serverJar, 'nogui'],
                { cwd: process.cwd() + "/gameServers/" + serverData.serverDir }
            );
            //TODO: add a signal to say that the server has launched is greenlighted for players
            // /Done (2.294s)! For help, type "help" or "?"/

            serverProcesses[id].stdout.on('data', function(data) {
                console.log(data.toString());
                if(data.toString().indexOf('Done') >= 0) {
                    deferred.resolve({status:'Success'});
                    serverProcesses[id].stdout.removeAllListeners();
                }
            });
        } else {
            deferred.resolve({status:'Failure'});
        }
        return deferred.promise;
    },
    // Stop Server
    stop: function(id) {
        var deferred = Q.defer();
        if(serverProcesses[id]) {
            serverProcesses[id].on('exit', function() {
                delete serverProcesses[id];
                deferred.resolve({status:'Success'});
            });

            serverProcesses[id].stdin.write('stop\n');
        } else {
            deferred.resolve({status:'Failure'});
        }
        return deferred.promise;
    },
    // Get Player List
    players: function(id) {
        var deferred = Q.defer();
        debugger;
        if(serverProcesses[id]) {
            serverProcesses[id].stdout.on('data', function(data) {
                console.log(data.toString());
                debugger;
                //if(data.toString().indexOf('Done') >= 0) {
                deferred.resolve({status:'Success'});
                serverProcesses[id].stdout.removeAllListeners();
                //}
            });

            serverProcesses[id].stdin.write('list\n');
        } else {
            deferred.resolve({status:'Failure', players:[]});
        }
        return deferred.promise;
    }
};

process.on('exit', function() {
    var servers = _.keys(serverProcesses);
    Q
        .all(_.map(servers, function(id) {
            return actions.stop(id);
        }));
});

module.exports = {
    action: function(req, res) {
        var id = req.params.id;
        var action = req.query.action;
        debugger;
        actions[action](id)
            .then(function(results) {
                debugger;
                res.status(200).send(results);
            })
            .catch(function(reason) {
                res.status(502).send(reason);
            });
    }
};
