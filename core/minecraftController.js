var exec = require('child_process');
var readline = require('readline');
var db = ('./mysql-Driver');

var path, jar, ram;
var MC_Servers = [];
var actions = {

    //scrap most of this. do a dtatbase lookup and spawn a new processr
    start: function(id){
        //take the ID and get the Database info

        // start the child node process
        // MC_Servers[id] = exec.fork('core/minecraftDriver.js',[
        //      path, jar, ram, id
        //]);
        //
        // MC_Servers[id].on('message',function(m){
        //        console.log('we got message:',m);
        // });

        // TEST CODE:
        if(id == 1){
            MC_Servers[id] = exec.fork('core/minecraftDriver.js',[
                "/gameServers/survival1.7.10/",
                'forge-1.7.10-10.13.2.1291-universal.jar',
                '512',
                id
            ]);
            MC_Servers[id].on('message',function(m){
                console.log('we got message:',m);
            });
            console.log("launching survival");
        }else{

            MC_Servers[id] = exec.fork('core/minecraftDriver.js',[
                "/gameServers/Vanila" ,
                'minecraft_server.1.8.7.jar',
                '512',
                id
            ]);

            console.log("launching Vanila");
             MC_Servers[id].on('message',function(m){
                console.log('we got message:',m);
            });
        }
    },
    stop: function(id){
        MC_Servers[id].send('stop');
    }
};

// somewhere we need to kickoff a socket to listen to our child processes

module.exports = {
    action: function(req, res){
        var id = req.params.id;
        var action = req.query.action;
        actions[action](id);
            //.then(function(results){
                res.status(200).send('ok');//results);
            //})
            //.catch(function(reason){
                //res.status(502).send(reason);
            //});
    }
};
