var _ = require('lodash');
var mysql = require('mysql');
var config = require('./config.json');
var connection = mysql.createConnection(config.mysql);

var mysqlDriver = {
    findServerByID: function(serverID, callback) {
        connection.query('SELECT * FROM `servers` WHERE `sid` = "'+ serverID +'"', callback);
    },
    findServerByName: function(serverName, callback) {
        connection.query('SELECT * FROM `servers` WHERE `name` = "'+ serverName +'"', callback);
    },
    findAllServers: function(callback) {
        connection.query('SELECT * FROM `servers`', function(err, result) {
            if(err) {
              return callback(err);
            }
            callback(null,
              _.mapKeys(result, function(server) {
                return server.sid;
              })
            );
        });
    }
};

module.exports = mysqlDriver;
