var proc = require('child_process');
var readline = require('readline');
var _ = require('lodash');
var MC_Proc = null;
var players = [];
var MyID = process.argv[5];

function stop(){
    process.send({
        id: MyID,
        status: 'stopping'
    });
    MC_Proc.stdin.write('/stop\n');
    MC_Proc.on('close', function(code){
        process.send({
            id: MyID,
            status: 'stopped'
        });
        console.log('Exiting child process with code:', code);
    });
}

//spawn a child process that will be the MCServer
function start(path, jar, ram){
    MC_Proc = proc.spawn(
        "java", [
            '-Xms'+ram+'M',
            '-Xmx'+ram+'M',
            '-jar',
            jar,
            'nogui'
        ],
        {
            cwd: process.cwd() + path
        }
    );
    process.on('message', function(m){
        console.log('Child got message:', m);
        if(m === 'stop') stop();
    });
    process.send({
        id: MyID,
        status: 'starting'
    });
    readline.createInterface({
        input: MC_Proc.stdout
    }).on('line', function(line){
        var p;
        if(line.indexOf('Done (') > 0){
            process.send({
                id: MyID,
                status: 'running',
                players: players
            });
        }else if(line.indexOf('joined the game')>0){
            p = line.split(' ')[3];
            players.push(p);
            console.log('Added Player: ' + p);
            process.send({
                id: MyID,
                status: 'running',
                players: players
            });
        }else if(line.indexOf('left the game')>0){
            p = line.split(' ')[3];
            console.log('Removing Player: ' + p);
            _.remove(players, p);
            process.send({
                id: MyID,
                status: 'running',
                players: players
            });
        }
    });
}

start(process.argv[2], process.argv[3], process.argv[4]);
//test line
//start("/gameServers/survival1.7.10/","forge-1.7.10-10.13.2.1291-universal.jar",512);
