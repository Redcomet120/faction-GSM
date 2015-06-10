var exec = require('child_process');
var dbDriver = require('../core/mysql-Driver');
var Q = require('q');
var serverProcesses = {};
var serverData = {
    backupDir: null,
    serverDir: "survival1.7.10",
    serverJar: "forge-1.7.10-10.13.2.1291-universal.jar",
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
            // QUESTION: We will need to find a way to load this from somewhere else
            //              Rather than hardcoded.
            serverProcesses[id] = exec.execFile(
                "java",
                ['-Xms512M', '-Xmx512M', '-jar', serverData.serverJar, 'nogui'],
                { cwd: process.cwd() + "/gameServers/" + serverData.serverDir }
            );
            // QUESTION: Does this stay open until the process is stopped/killed?
            //              We may need to end it somehow

            serverProcesses[id].stdout.on('end', function() {
                debugger;
                deferred.resolve('Success');
            });

            serverProcesses[id].stdout.pipe(process.stdout);
            //TODO: add a signal to say that the server has launched is greenlighted for players
            // /Done (2.294s)! For help, type "help" or "?"/
        } else {
            deferred.resolve('Failure');
        }
        return deferred.promise;
    },
    // Stop Server
    stop: function(id) {
        var deferred = Q.defer();
        if(serverProcesses[id]) {
            //TODO Make sure the server shuts down successfully before deleting id
            serverProcesses[id].stdout.on('end', function() {
                debugger;
                deferred.resolve('Success');
            });
            serverProcesses[id].stdin.write('stop\n');
            serverProcesses[id].stdout.pipe(process.stdout);
            serverProcesses[id].stdin.end();
            delete serverProcesses[id];
            deferred.resolve('Success');
        } else {
            deferred.resolve('Failure');
        }
        return deferred.promise;
    },
    // Get Player List
    players: function(id) {
        var deferred = Q.defer();
        if(serverProcesses[id]) {
            var output;

            serverProcesses[id].stdout.on('end', function() {
                debugger;
                deferred.resolve('Success');
            });
            serverProcesses[id].stdin.write('list\n');
            serverProcesses[id].stdout.pipe(output);
            serverProcesses[id].stdin.end();
            deferred.resolve('Success');
        } else {
            deferred.resolve('Failure');
        }
        return deferred.promise;
    }
};


/*
//finds server info in database
var findServer: function(serverName) {
    //query the db
    serverData = dbDriver.serverByName(serverName,
        function(err, res){
            if(err){
                console.log(err);
            }
            if(!res){
                return false;
            } else {
                return res;
            }
        }
    );
};
*/

process.on('exit', function() {
    var servers = _.keys(serverProcesses);
    _.each(servers, function(id) {
        stopServer(id);
    });
});

module.exports = {
    action: function(req, res) {
        var id = req.params.id;
        var action = req.query.action;
        actions[action](id)
            .then(function(results) {
                res.status(200).send(results);
            })
            .catch(function(reason) {
                res.status(502).send(reason);
            });
    }
};
