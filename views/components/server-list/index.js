var Backbone = require('backbone');
var React = require('react');
var _ = require('lodash');
var styles = {
    button: {
        cursor: "pointer"
    }
};

var Server = React.createClass({
    displayName: 'Server',

    getDefaultProps: function() {
        return {
            server: {}
        };
    },
    getInitialState: function() {
        return {
            status: 'stopped',
            players: []
        };
    },

    componentDidMount: function(){
        Backbone.on('serverStarted', function() {
            this.setState({
                status: "started"
            });
            Backbone.trigger('getPlayers', this.props.server.sid);
        }, this);
        Backbone.on('failedToStart', function() {
            this.setState({
                status: "stopped",
                error: "Failed to start"
            });
        }, this);
        Backbone.on('serverStopped', function() {
            this.setState({
                status: "stopped",
                players: []
            });
        }, this);
        Backbone.on('hasPlayers', function(players) {
            this.setState({
                players: players
            });
        }, this);
        Backbone.trigger('getPlayers', this.props.server.sid);
    },

    startServer: function() {
        Backbone.trigger('startServer', this.props.server.sid);
    },
    stopServer: function() {
        Backbone.trigger('stopServer', this.props.server.sid);
    },
    getPlayers: function() {
        Backbone.trigger('getPlayers', this.props.server.sid);
    },

    render: function() {
        return(
            <div className='row'>
                <div className='small-12 column'>
                    <div className='row'>
                        <h3 className='small-4 column'>{ this.props.server.name }</h3>
                        <div className='small-4 column'>IP</div>
                        <div className='small-2 column'>Status: { this.state.status }</div>
                        <div className='small-2 column' onClick={ this.getPlayers } style={ styles.button }>Players: { this.state.players.length }</div>
                    </div>
                    <div className='row'>
                        <div className='small-6 column'>{ this.props.server.descr }</div>
                        <div className='small-6 column'>
                            <div className='row'>
                                <div className='small-6 column' onClick={ this.startServer } style={ styles.button }>Start</div>
                                <div className='small-6 column' onClick={ this.stopServer } style={ styles.button }>Stop</div>
                            </div>
                            <div className='row'>
                                <div className='small-6 column'>{ this.props.server.game }:</div>
                                <div className='small-6 column'>{ this.props.server.gameVer }</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var ServerList = React.createClass({
    displayName: 'Server List',

    getDefaultProps: function() {
        return {
            servers: []
        };
    },

    formatServerList: function() {
        return _.map(this.props.servers, function(server) {
            return <Server server={ server } key={ server.id }/>;
        });
    },

    render: function() {
        return (
            <div>
                { this.formatServerList() }
            </div>
        );
    }
});

module.exports = ServerList;
