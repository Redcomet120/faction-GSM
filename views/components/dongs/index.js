var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');
var ServerList = require('../server-list');
var ServerListStore = require('../../../flux/stores/server-list');
var Router = require('../../../js/router.js');

var Init = React.createClass({
    displayName: 'Init',

    componentWillMount: function() {
        this.setState(ServerListStore.toJSON());
    },

    componentDidMount: function() {
        ServerListStore.on('change', this.setStateFromStore);
    },

    setStateFromStore: function(model) {
        this.setState(model.toJSON());
    },

    render: function() {
        return (
            <div>
                <ServerList servers={ this.state.servers } />
            </div>
        );
    }
});

    Backbone.history.start({pushState:true}),

React.render(<Init />, document.getElementById('content'));
