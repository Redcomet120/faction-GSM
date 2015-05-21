var $ = require('jquery');
var React = require('react');
var _ = require('lodash');

var ServerList = React.createClass({
    displayName: 'Init',

    getDefaultProps: function() {
        return {
            servers: []
        };
    },

    formatServerList: function() {
        return _.map(this.props.servers, function(server) {
            return(
                <div className='row'>
                    <div className='small-12 column'>
                        <div className='row'>
                            <h3 className='small-4 column'>{ server.name }</h3>
                            <div className='small-4 column'>IP</div>
                            <div className='small-3 column'>Status</div>
                            <div className='small-1 column'># Players</div>
                        </div>
                        <div className='row'>
                            <div className='small-6 column'>{ server.descr }</div>
                            <div className='small-6 column'>
                                <div className='row'>
                                    <div className='small-6 column'>Start</div>
                                    <div className='small-6 column'>Stop</div>
                                </div>
                                <div className='row'>
                                    <div className='small-6 column'>{ server.game }:</div>
                                    <div className='small-6 column'>{ server.gameVer }</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
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
