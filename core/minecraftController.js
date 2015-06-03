var exec = require('child_process');
var dbDrver = require('../core/mysql-Driver');
var server = null;
var runner = require("minecraft-runner");

module.exports = {
    //loads up a server and takes control of it based
    //on the directory passed in
    load:function(dir){

    },
    /*
       startServer:function()
       {
       server = new runner("
       }
       */
    startServer:function()
    {
        console.log(process.cwd());
        server = exec.spawn(
                "java",
                ['-Xms512M', '-Xmx512M', '-jar', 'forge-1.7.10-10.13.2.1291-universal.jar', 'nogui'],
                { cwd: process.cwd()+"/gameServers/survival1.7.10"});

    },
    startBacon:function()
    {
        var serverJar = "forge-1.7.10-10.13.2.1291-universal.jar";
        var serverRoot = "survival1.7.10/";
        exec('java -jar '+serverJar,
                {cwd: '~/dongs/gameServers/'+serverRoot},
                function(error, stdout, stderr){
                    console.log('stdout: '+ stdout);
                    console.log('stderr: '+ stderr);
                    if(error !== null){
                        console.log('exec error: '+ error);
                    }
                });
    },
    stopServer: function()
    {
        server.stdin.write('stop \n');
    },
    //finds server info in database and loads it to our MCServer object
    findServer:function(serverName){
        //query the db
        var result = dbDriver.serverByName(serverName,
                function(err, res){
                    if(err){
                        console.log(err);
                    }
                    if(!res){
                        return false;
                    }else{
                        return res;
                    }
                });
        //if we have a result
        if(result.length){
            MCServer.sid = row[0].sid;
            MCServer.path = row[0].path;
            MCServer.name = row[0].name;
            MCServer.mods = row[0].mods;
            MCServer.client = row[0].client;
            MCServer.descr = row[0].description;
            MCServer.mcVer = row[0].mcversion;
        }else{
            return false
        }
    }
};
