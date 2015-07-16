var _ = require('lodash');
var devnull = require('dev-null');
var events = require('events');
var util = require('util');
var exec = require('child_process');
var readline = require('readline');

var Q = require('q');

/*Create instances to run minecraft so that multiple servers can
 * be monitored individually. we will be acheiving this using prototypes
 * and a custom eventEmitter.
 *
 * @param {String}dir = "path to instaces' game";
 * @param {String}jar = "launcher jar";
 * @param {Object} = "not sure exaclty what this is yet";
 */
function Server(dir, jar, options)
{
    _.assign(this, args);
    this.dir = process.cwd()+ "/gameServers/"+dir;
    this.jar = jar;
    this.players = [];
    this.status = "stopped";
    //Constructor call for eventEmitter
    events.EventEmitter.call(this);
}
//this becomes our Emitter
util.inherits(Server, events.EventEmitter);

Server.prototype.start = function(callback){
    var game = this;

    if(game.status == "running"){
        game.emit("error", new Error("Server is already running"));
    }
    if(game.status == "starting"){
        game.emit("error", new Error("Server is already Starting"));
    }

    // fire-off a starting event
    game.emit("starting");
    game.status = "starting";

    var proc = exec.spawn("java",
                ['-Xms512M', '-Xmx512M', '-jar', game.jar, 'nogui'],
                { cwd: process.cwd() + "/gameServers/" + game.dir }
    );

    //link reader
    var readByLine = readline.CreateInterface(proc.stdout, devnull());

    //handle launch errors
    proc.on('error', function(err){
        game.status = "Error";
        game.emit('error', err);
    });

    //handle premature close
     proc.on('close' , function(close, reason){
         if(game.status=="running"){
             game.emit("Crashed", close, reason);
        }else{
            game.emit("error" , new Error("Server Failed"));
        }
        game.status = "crashed";
    });

     //set up trigger to digest proc output
     readByLine.on('line', function(line){
         game.digest(line);
     });
};

//regex for Minecraft out syntax
//[hh:mi:se] [Server thread/etc]: message
var syntax = /^\[(\d+):(\d+):(\d+)]\s+\[([^\/\]]+)\/([^\]]+)\]:\s(.*)$/;
//catch specific outputs and do stuff for them.
var msgCatcher = {
    started:{
        //look for Done, blah blah
        regex: /^Done \([\d\.]+s\)\! For help, type "help" or "\?"/,
        callback: function(game, exploded){
            game.status = "running";
            game.emit("running");
        }
    },
    joined:{
        regex: /^(\S+) joined the game/,
        callback: function(game, exploded){
            game.players.push(exploded[1]);
            game.emit('joined',exploded[1]);
        }
    },
    left:{
        regex: /^(\S+) left the game/,
        callback: function(game, exploded){
            var i = game.players.indexOf(exploded[1]);
            game.players.splice(i, 1);
            game.emit('left', exploded[1]);
        }
    },
    lostConnection:{
        regex: /^(\S+) lost connection/,
        callback: function(game, exploded){
            var i = game.players.indexOf(exploded[1]);
            game.players.splice(i, 1);
            game.emit('lostConnection', exploded[1]);
        }
    }
}

Server.prototype.digest = function(line){
    var game =this;
    var exploded = syntax.exec(line);
    var message;
    var bMatched = false;

    //emit generic messages
    if(exploded){
        message = {
            time:{
                hours: exploded[1],
                minutes: exploded[2],
                seconds: exploded[3],
            },
            src: exploded[4],
            priority: exploded[5],
            body: exploded[6],
            raw: line
        }
        game.emit('message', message);
        _.value(msgCatcher).foreach(function(cases){
            var filtered = cases.regex.exec(message.body);
            var caller;
            if(filtered){
                caller = cases.callback(game, filtered);
                if(!(caller == false)){
                    bMatched = true;
                }
            }
        });
        if(!bMatched){
            game.emit('unknownMsg', message);
        }
        else{
            game.emit('unknownLn', raw);
        }
    }
}

Server.prototype.action = function(command, callback){
    var game = this;
    if(((game.status != "running")|| !game.proc)&& callback){
        return setTimeout(callback(new Error("not running")), 0);
    }
    game.proc.stdin.write(command + "\n","utf8", callback);
}

Server.prototype.stop = function(callback){
    var game = this;
    //TODO: close the emitter here
    if(callback){
        game.once('stop', callback);
    }
    game.emit('close', devnull());
    game.sendCommand("stop");
}

Server.prototype.__proto__ = events.EventEmitter.prototype;

module.exports.Server = Server;
