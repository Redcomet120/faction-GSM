var exec = require('child_process');
var db = ('./mysql-Driver');
var serverData = null;
var MC_Server = null;
var actions = {

    //start server
    start: function(id){
        //serverData = db.findServerByID(id);
        console.log(id);
        MC_Server = exec.spawn(
            "java",
            [
                '-Xms512M',
                '-Xmx512M',
                '-jar',
                'forge-1.7.10-10.13.2.1291-universal.jar',
                'nogui'
            ],
            {
                cwd: process.cwd() + "/gameServers/survival1.7.10/"
            }
        );
        MC_Server.stdout.on('data', function(data){
            console.log(data.toString());
        });
    },

    stop: function(id){
    }
};

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
