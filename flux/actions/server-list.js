var Dispatcher = require('../dispatcher');
var _ = require('lodash');
require('whatwg-fetch');

var theAlmightyGlowCloud = function(url, method, body) {
    var options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    if(method) _.extend(options, { method: method });
    if(body) _.extend(options, { body: JSON.stringify(body) });

    return fetch(url, options)
        .then(function(response) {
            return response.json();
        });
};

module.exports = {
    getServerList: function() {
        var url = '/api/servers';
        return theAlmightyGlowCloud(url)
            .then(function(results) {
                Dispatcher.dispatch({
                    actionType: 'hasServers',
                    data: results
                });
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    startServer: function() {
    },
    stopServer: function() {
    }
};
