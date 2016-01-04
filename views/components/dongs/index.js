var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');
var ServerList = require('../server-list');
var ServerListStore = require('../../../flux/stores/server-list');
var Router = require('../../../js/router.js');
window.$ = $;
window.Backbone = Backbone;
window.Backbone.$ = window.$;

var Init = React.createClass({
    displayName: 'Init',

    componentWillMount: function() {
        this.setState(ServerListStore.toJSON());
    },

    componentDidMount: function() {
        ServerListStore.on('change', this.setStateFromStore);
        new Router;
        Backbone.history.start({pushState:true});
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

React.render(<Init />, document.getElementById('content'));
