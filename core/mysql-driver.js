var _ = require('lodash');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host    : 'localhost',
    database: 'dongs',
    user    : 'dongs',
    password: 'D0ng$'
});

var mysqlDriver = {
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
