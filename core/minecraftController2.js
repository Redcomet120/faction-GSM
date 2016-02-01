var io = require('socket.io').listen(8081);
var proc = require('child_process');

var servers = null,
    server = null,
    mc_server = null;

servers = {
    survival: "survival",
    vanila: "vanila"
};

//
io.sockets.on('connection', function(socket){
    //returns the entire list to the client
    socket.on('get_server_list', function(){
        socket.emit('server_list', servers);
    });

    //send status
    socket.on('get_status', function(){
        socket.emit('status',server);
    });

    //starts a server
    socket.on('start_Server', function(name){
       // check if one is running or one exists
        if(mc_server || !servers[name]){
            //notify failure
            socket.emit('fail', 'start_server');
            return;
        }

        //set the server to running
        server = name;

        //launch the the jar
        mc_server = proc.spawn(
            "java",['-Xms1024M', '-Xmx1024M', '-jar', 'forge-1.7.10-10.13.2.1291-universal.jar', 'nogui'],
            {cwd: process.cwd() + "/gameServers/survival1.7.10/"}
        );

        io.sockets.emit('status', server);

        //handle regular output
        mc_server.stdout.on('data', function (data){
            if(data){
                io.sockets.emit('console', ""+data);
            }
        });

        //handle error output
         mc_server.stderr.on('data', function (data){
            if(data){
                io.sockets.emit('console', ""+data);
            }
        });

         mc_server.on('exit', function (){
             mc_server = null;
             io.sockets.emit('status', null);
        });
    });

    socket.on('command', function(cmd){
        if(mc_server){
            io.socket.emit('console', "Player Command: " + cmd);
            mc_server.stdin.write(cmd + "\r");
        } else {
            socket.emit('fail', cmd);
        }
    });

});

//allows for input
process.stdin.resume();
process.stdin.on('data', function(data){
    if(mc_server){
        mc_server.stdin.write(data);
    }
});

