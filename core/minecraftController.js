var _ = require('lodash');
var exec = require('child_process');
var mysqlDriver = require('./mysql-driver');

var mcServers = [];
var actions = {

    //scrap most of this. do a dtatbase lookup and spawn a new processr
    start: function(id, io){
        io.emit("start", id);
        if(mcServers[id]){
            console.log("Server is already running");
            return;
        }
        //take the ID and get the Database info
        mysqlDriver.findServerByID(id,function(err, result){
            if(err || _.isEmpty(result)) {
                console.log("Failed to obtain server with ID:", id);
                return;
            }

            var serverData = JSON.parse(_.first(result).serverData);

            // start the child node process
            mcServers[id] = exec.fork('core/minecraftDriver.js',[
                '/gameServers/' + serverData.serverDir + '/',
                serverData.serverJar,
                '512',
                id
            ]);

            mcServers[id].on('message', function(m){
                console.log('We got message:', m);
            });
        });
    },
    stop: function(id, io){
        if(!_.isEmpty(mcServers[id])) {
            mcServers[id].send('stop');
        } else {
            console.log('Server ' + id + ' is not currently running.');
        }
    }
};

// somewhere we need to kickoff a socket to listen to our child processes

module.exports = {
    action: function(req, res, io){
        var id = req.params.id;
        var action = req.query.action;
        actions[action](id, io);
            //.then(function(results){
                res.status(200).send();//results);
            //})
            //.catch(function(reason){
                //res.status(502).send(reason);
            //});
    }
};
