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
var mcout = ' ';

module.exports = {
    //loads up a server and takes control of it based
    //on the directory passed in
    players: function() {
        serverProc.stdin.write('list \n');
        serverProc.stdin.end();
/*        serverProc.stdout.on('data', function(data){
            console.log(data);
            //mcout += data;
        });
        serverProc.stdout.on('end', function() {
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
