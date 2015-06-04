var exec = require('child_process');
var dbDriver = require('../core/mysql-Driver');
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

module.exports = {
    //loads up a server and takes control of it based
    //on the directory passed in
    load: function() {

    },
    startServer: function() {
        console.log(process.cwd());
        serverProc = exec.spawn(
                "java",
                ['-Xms512M', '-Xmx512M', '-jar', serverData.serverJar, 'nogui'],
                { cwd: process.cwd()+"/gameServers/"+serverData.serverDir});
    },
    stopServer: function() {
        serverProc.stdin.write('stop \n');
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
