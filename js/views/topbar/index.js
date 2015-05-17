var Backbone = require('backbone');
var React = require('react');
var styles = require('./styles');

var TopBar = React.createClass({
    displayName: 'Top Bar',

    logout: function() {
        window.location = '/logout';
    },

    render: function() {
        return (
            <div className="row" style={ styles.container }>
                <button
                    className="button small radius"
                    onClick={ this.logout }
                    style={ styles.button }>Log Out</button>
            </div>
        );
    }
});

module.exports = TopBar;
