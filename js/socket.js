var io = require('socket.io-client');

var socket = io.connect(window.location.origin);

socket.on('start', function(id){
    console.log("we started", id);
});
