var mysql = require('mysql');
var connection = mysql.createConnection({
    host    : 'localhost',
    database: 'dongs',
    user    : 'dongs',
    password: 'D0ng$'
});

ServerDBController = {
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
     }




};

module.exports = ServerDBController;
