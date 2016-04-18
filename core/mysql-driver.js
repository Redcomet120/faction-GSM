var _ = require('lodash');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host    : 'localhost',
    database: 'dongs',
    user    : 'dongs',
    password: 'D0ng$'
});

var ServerDBController = {
    findServerByName: function(serverName) {
        connection.query('SELECT * FROM `servers` WHERE `name` = "'+ serverName +'"',
            function(err, result){
                if(err){
                    return err;
                }
                return result;
            }
        );
    },
    //TODO: fix the SQL query
    getAll: function(req, res) {
        connection.query('SELECT * FROM `servers`', function(err, result) {
            if(err) {
                return res.status(502).send(err);
            }
            var servers = _.mapKeys(result, function(server) {
                return server.sid;
            });
            return res.status(200).send(servers);
        });
    }
};

module.exports = ServerDBController;
