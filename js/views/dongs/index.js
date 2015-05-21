var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');
var TopBar = require('../topbar');
var ServerList = require('../server-list');
var Footer = require('../footer');

var ServerModel = require('../../models/servers');
new ServerModel();

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
            <div style={{ minHeight: '100%', position: 'relative' }}>
                <TopBar />
                <div style={{ paddingBottom: '100px' }}>
                    <ServerList servers={ this.state.servers } />
                </div>
                <Footer />
            </div>
        );
    }
});

React.render(<Init />, document.getElementById('content'));
