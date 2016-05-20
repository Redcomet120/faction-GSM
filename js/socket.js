var io = require('socket.io-client');
var Dispatcher = require('../flux/dispatcher');

var socket = io.connect(window.location.origin);

// when we get this we should disable the sart button and show it as yellow launching
socket.on('starting', function(data){
    console.log("we are starting", data.id);
    Dispatcher.dispatch({
        actionType: 'updateStatus',
        data: {
            id: data.id,
            status: 'starting'
        }
    });
});

//make the the stop button active
socket.on('running', function(data){
    console.log(data.id," is running");
    Dispatcher.dispatch({
        actionType: 'updateStatus',
        data: {
            id: data.id,
            status: 'running'
        }
    });
    Dispatcher.dispatch({
        actionType: 'updatePlayers',
        data: {
            id: data.id,
            players: data.players
        }
    });
});

//stopping: after stop is clicked disable start show as yellow stopping
socket.on('stopping', function(data){
    console.log(data.id," is stopping");
    Dispatcher.dispatch({
        actionType: 'updateStatus',
        data: {
            id: data.id,
            status: 'stopping'
        }
    });
});
//stopped: show the start button as green and clickable
socket.on('stopped', function(data){
    console.log(data.id," is stopped");
    Dispatcher.dispatch({
        actionType: 'updateStatus',
        data: {
            id: data.id,
            status: 'stopped'
        }
    });
    Dispatcher.dispatch({
        actionType: 'updatePlayers',
        data: {
            id: data.id,
            players: []
        }
    });
});
