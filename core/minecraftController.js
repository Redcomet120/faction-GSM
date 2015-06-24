var _ = require('lodash');
var exec = require('child_process');
var Q = require('q');
var serverProc = null;
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
var mcout = ' ';

/*<<<<<<< HEAD
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
====== */
module.exports = {
    //loads up a server and takes control of it based
    //on the directory passed in
    players: function() {
       // serverProc.stdin.end();
     // serverProc.stdout.on('data', function(data){
        serverProc.stdin.write('list \n');
        serverProc.stdout.pipe(process.stdout);
//          console.log(data);
//
            //mcout += data;
//        });
/*        serverProc.stdout.on('end', function() {
            console.log(mcout);
        });
*/
    },
    //TODO:need to put server proc in an array of running processes
    //TODO: add a signal to say that the server has launched is greenlighted for players
    //TODO: log the launch of the server ?
    startServer: function() {
        console.log(process.cwd());
        serverProc = exec.execFile(
                "java",
                ['-Xms512M', '-Xmx512M', '-jar', serverData.serverJar, 'nogui'],
                { cwd: process.cwd()+"/gameServers/"+serverData.serverDir});

/*        serverProc.stdout.on('data', function(data){
            mcout += data;
        });
        serverProc.stdout.on('end', function(){
            console.log(mcout);
        });
        mcout = ' ';
*/
     },
    stopServer: function() {
        console.log("sending stop");
        serverProc.stdin.write('stop \n');
        serverProc.stdout.pipe(process.stdout);
        serverProc.stdin.end();
 /*       serverProc.stdout.on('data', function(data){
            //console.log(data);
            mcout += data;
        });
        serverProc.stdout.on('end', function(){
            console.log(mcout);
        });
        mcout= ' ';
 */
    },
    //finds server info in database
    findServer: function(serverName) {
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
    }
};
