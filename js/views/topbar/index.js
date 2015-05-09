var Backbone = require('backbone');
var React = require('react');

var TopBar = React.createClass({
    displayName: 'Top Bar',

    logout: function() {
        Backbone.history.navigate('/logout', {trigger: true, replace: true});
    },

    render: function() {
        return (
            <div className="row">
                <button onclick={this.logout}>Log Out</button>
            </div>
        );
    }
});

module.exports = TopBar;
