var mysqlDriver = require('./mysql-driver');

var ServerDBController = {
    getAll: function(req, res) {
        mysqlDriver.findAllServers(function(err, servers){
            if(err) {
                return res.status(502).send(err);
            }
            return res.status(200).send(servers);
        });
    }
};

module.exports = ServerDBController;
