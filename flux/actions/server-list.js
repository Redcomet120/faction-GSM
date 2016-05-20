var Dispatcher = require('../dispatcher');
var _ = require('lodash');
var Q = require('q');
require('whatwg-fetch');

var theAlmightyGlowCloud = function(url, method, body) {
    var options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    if(method) _.extend(options, { method: method });
    if(body) {
        if(method === 'get') {
            url += '?' + JSON.stringify(body);
        } else {
            _.extend(options, { body: JSON.stringify(body) });
        }
    }

    return fetch(url, options)
        .then(function(response) {
            return response.json();
        });
};

module.exports = {
    getServerList: function() {
        var url = '/api/servers';
        var urlStatus = url + '/status';
        return Q.all([theAlmightyGlowCloud(url), theAlmightyGlowCloud(urlStatus)])
            .then(function(results) {
                return _.merge(results[0], results[1]);
            })
            .then(function(servers) {
                Dispatcher.dispatch({
                    actionType: 'hasServers',
                    data: servers
                });
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    startServer: function(id) {
        var url = '/api/servers/' + id + '?action=start';
        return theAlmightyGlowCloud(url)
            .catch(function(err) {
                console.log(err);
            });
    },
    stopServer: function(id) {
        var url = '/api/servers/' + id + '?action=stop';
        return theAlmightyGlowCloud(url)
            .catch(function(err) {
                console.log(err);
            });
    }
};
