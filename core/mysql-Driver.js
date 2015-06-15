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
            if(err) return res.status(502).send(err);
            return res.status(200).send(result);
        });
     },
    createNewServer : function(ServerData){
        dataStr = JSON.stringify(ServerData);
        connection.query("INSERT INTO servers (serverData, name, mods, client, game, gameVer, descr, created)"
                + "VALUES ('"+dataStr+"', 'working vanila','none','none', 'minecraft', '1.8.X', 'this server is a mod free minecraft instance that is kept up to date with the latest minecraft builds', '"+ new Date()+"')");

    }
};

module.exports = ServerDBController;
