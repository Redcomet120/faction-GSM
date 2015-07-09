var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');
var ServerList = require('../server-list');

var ServersCollection = require('../../../models/servers');
new ServersCollection();

var Init = React.createClass({
    displayName: 'Init',

    getInitialState: function() {
        return {
            servers: []
        };
    },

    componentDidMount: function(){
        window.Backbone = Backbone;
        window.$ = $;
        window.Backbone.$ = $;

        Backbone.on('hasServers', function(servers) {
            this.setState({
                servers: servers
            });
        }, this);
        Backbone.trigger('getServers');
    },

    render: function() {
        return (
            <div>
                <ServerList servers={ this.state.servers } />
            </div>
        );
    }
});

React.render(<Init />, document.getElementById('content'));
