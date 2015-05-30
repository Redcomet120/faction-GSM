var exec = require('child_process').spawn;
var dbDrver = require('../core/mysql-Driver');

    module.exports = {
    //loads up a server and takes control of it based
    //on the directory passed in
    load:function(dir){

    },
    startServer:function()
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

var MCCont = require('../core/minecraftController');

//var myserver = MCCont.gwtPlayers('RailRoad');
