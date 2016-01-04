var React = require('react');
var _ = require('lodash');
var ServerListActions = require('../../../flux/actions/server-list');

var Server = React.createClass({
    displayName: 'Server',

    getInitialState: function() {
        return {
            status: 'stopped'
        };
    },
    startServer: function() {
        ServerListActions.startServer(this.props.sid);
    },
    stopServer: function() {
        ServerListActions.stopServer(this.props.sid);
    },

    render: function(){
        return(
            <div className='listItem'>
                <div className="listTitle">{this.props.name}</div>
                <div className="listIP"><i className="fa fa-gear"/>IP HERE</div>
                <div className="listStatus">{this.state.status}</div>
                <div className="listButton">
                    <button className="btn btn-success">
                        Start
                    </button>
                </div>
            </div>
        );
    }
});

var ServerList = React.createClass({
    displayName: 'Server List',

    formatServerList: function(){
        return _.map(this.props.servers, function(server){
            return <Server {...server} key={ server.sid } />;
        });
    },
    render: function(){
        return(
            <div className="bodyCont">
                <div className="listWrapper">
                    <div className="listHeader">
                        <div className="listTitle">Server Name</div>
                        <div className="listIP">IP address</div>
                        <div className="listStatus">Status</div>
                        <div className="listButton">
                            <button className="btn btn-info">
                                <i className="fa fa-plus-square"/>
                            </button>
                        </div>
                    </div>
                   <div> { this.formatServerList() }</div>
                </div>
            </div>
        );
    }
});
module.exports = ServerList;
