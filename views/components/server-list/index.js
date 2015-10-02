var React = require('react');
var _ = require('lodash');
var COLORS = require('../common/styles/colors');
var ServerListActions = require('../../../flux/actions/server-list');

var Server = React.createClass({
    displayName: 'Server',

    styles: {
        hover: {
            background: COLORS.white(0.9)
        },
        odd: {
            background: COLORS.lightGreen(0.7)
        },
        even: {
            background: COLORS.darkGreen(0.7)
        },
        button: {
            cursor: 'pointer'
        }
    },

    getInitialState: function() {
        return {
            hover: false
        };
    },

    startServer: function() {
        ServerListActions.startServer(this.props.server.sid);
    },
    stopServer: function() {
        ServerListActions.stopServer(this.props.server.sid);
    },
    mouseOver: function() {
        this.setState({ hover: true });
    },
    mouseOut: function() {
        this.setState({ hover: false });
    },

    render: function() {
        var backgroundColor = this.props.index % 2 !== 0 ? this.styles.odd : this.styles.even;
        if(this.state.hover) backgroundColor = this.styles.hover;
        return(
            <div className='row' style={ backgroundColor } onMouseOver={ this.mouseOver } onMouseOut={ this.mouseOut }>
                <div className='small-12 column'>
                    <div className='row'>
                        <h3 className='small-4 column'>{ this.props.server.name }</h3>
                        <div className='small-3 column'>IP</div>
                        <div className='small-3 column'>Status: { this.state.status }</div>
                        <div className='small-2 column' onClick={ this.getPlayers } style={ this.styles.button }>Players: { this.state.players.length }</div>
                    </div>
                    <div className='row'>
                        <div className='small-7 column'>{ this.props.server.descr }</div>
                        <div className='small-5 column'>
                            <div className='row'>
                                <div className='small-6 column' onClick={ this.startServer } style={ this.styles.button }>Start</div>
                                <div className='small-6 column' onClick={ this.stopServer } style={ this.styles.button }>Stop</div>
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

    styles: {
        list: {
            marginTop: '100px',
            borderRadius: '25px',
            overflow: 'hidden',
            boxShadow: '0 40px 30px 15px ' + COLORS.black(0.6)
        }
    },

    formatServerList: function() {
        return _.map(this.props.servers, function(server, index) {
            return <Server server={ server } key={ server.id } index={ index }/>;
        });
    },

    render: function() {
        return (
            <div style={ this.styles.list } className='row'>
                <div className='small-12 column'>
                    { this.formatServerList() }
                </div>
            </div>
        );
    }
});

module.exports = ServerList;
