var mysql = require('mysql');
var connOpts = require('../config/config').mysql;
var serverDataEx = /\[{serverData:'({.*})'}]/;

var ServerDBController = {
    findServerByName: function(serverName) {
        var connection = mysql.createConnection(connOpts);
        connection.query('SELECT * FROM `servers` WHERE `name` = "'+ serverName +'"',
            function(err, result){
                if(err){
                    return err;
                }
                return result;
            }
        );
        connection.end()
    },
    getAll: function(req, res) {
        var connection = mysql.createConnection(connOpts);
        connection.query('SELECT * FROM `servers`', function(err, result) {
            if(err) return res.status(502).send(err);
            return res.status(200).send(result);
        });
        connection.end()
    },
    getServerData: function(req, res) {
        var id = req.params.id;
        var connection = mysql.createConnection(connOpts);
        connection.query('SELECT `serverData` FROM `servers` WHERE `sid` = ' + id,
            function(err, result){
                if(err) return res.status(502).send(err);
                // Server Data in table is stored as a string. Convert to JSON
                res.status(200).send(JSON.parse(result[0].serverData));
            }
        );
        connection.end()
    }
};

module.exports = ServerDBController;
