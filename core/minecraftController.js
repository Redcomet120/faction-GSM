var _ = require('lodash');
var exec = require('child_process');
var mysqlDriver = require('./mysql-driver');

var mcServers = {};
var mcServerStatus = {};
var actions = {};

    //scrap most of this. do a dtatbase lookup and spawn a new processr
    start: function(id, io){
        if(mcServers[id]){
            console.log("Server is already running");
            return;
        }
        //take the ID and get the Database info
        mysqlDriver.findServerByID(id, function(err, result){
            if(err || _.isEmpty(result)) {
                console.log("Failed to obtain server with ID:", id);
                return;
            }
            var serverData = JSON.parse(_.first(result).serverData);

            // set the status
            mcServerStatus[id] = 'starting';
            // start the child node process
            mcServers[id] = exec.fork('core/minecraftDriver.js',[
                '/gameServers/' + serverData.serverDir + '/',
                serverData.serverJar,
                '512',
                id
            ]);

            mcServers[id].on('message', function(m){
                io.emit(m.status, m);
                console.log('We got message:', m);
                if(m.status === 'stopped') {
                    delete mcServers[id];
                    delete mcServerStatus[id];
                }else if(m.status === 'running') {
                    mcServerStatus[id] = 'running';
                }else if(m.status === 'stopping') {
                    mcServerStatus[id] = 'stopping';
                }
            });
        });
    },
    stop: function(id){
        if(!_.isEmpty(mcServers[id])) {
            mcServerStatus[id] = 'stopping'
            mcServers[id].send('stop');
        } else {
            console.log('Server ' + id + ' is not currently running.');
        }
    }
};


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
