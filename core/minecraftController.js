var MCadmin = require("minecraft-server-admin");
var dbDrver = require('../core/mysql-Driver');
var MCServer= {
    sid     : null,
    path    : null,
    name    : null,
    mods    : null,
    client  : null,
    descr   : null,
    mcVer   : null,
};


module.exports ={
    function startServer(serverName){
         //find the server in database
        if(!this.findServer(serverName))
        {
            console.log("shit we can't find this server");
            //should report an error here
        }
        else{
            //initiate the node-minecraft-server- instance for our server
            MCadmin.Server(MCServer.path);
            //check if it's already running
            //check if resources available
            //launch
            MCadmin.Server#start(function(){
                console.log("Ithink it's starting");
            });
        //check for running
        //return running
    },
    function stopServer(serverName){
        //check for active players
        if( MCadmin.Server#status != "stopped")
        {
            MCadmin.Server#stop(function(){
                console.log("Ithink it stopped");
        //check for running
        //send shutdown
        //return stopped
    },
    //finds server info in database and loads it to our MCServer object
    function findServer(serverName){
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
    },

};

var MCCont = require('../core/minecraftController');

var myserver = MCCont.gwtPlayers('RailRoad');
