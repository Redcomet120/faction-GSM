var events = require("events");
var proc = require('child_process');
var readline = require('readline');
var net = require('net');

var serverData = null;
var MC_Proc = null;
var MyID = process.argv[5];
//var MCEmitter = new EventEmitter();

function stop(){
    MC_Proc.stdin.write('/stop');
    MC_Proc.on('close', console.log("successful close"));
}


//spawn a child process that will be the MCServer
function start(path, jar, ram){
    MC_Proc = proc.spawn(
        "java",[
            '-Xms'+ram+'M',
            '-Xmx'+ram+'M',
            '-jar',
            jar,
            'nogui'
        ],
        { cwd: process.cwd() + path});

    readline.createInterface({
        input: MC_Proc.stdout
    }).on('line', function(line){
        if(line.indexOf('Done (') > 0){
            console.log("hey It's running. we should probably tell someone");
           // stop();
        }
    });
}

//start a readline on this process that will read output

//emit 'done' when done is posted to output.

//MCEmitter.on("done", function (){
//    console.log("server is ready");
// });
// need to figure out how to contact the parent and kick off a function there
//MCEmitter.emit("done");

start(process.argv[2], process.argv[3], process.argv[4]);
process.stdin.on('data', function(data){
   if(data.toString() == "stop"){
       console.log("stop was called");
       stop();
   }
});
//test line
//start("/gameServers/survival1.7.10/","forge-1.7.10-10.13.2.1291-universal.jar",512);
