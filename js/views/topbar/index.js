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
            <div style={ styles.topbar }>
                <div className="row" style={ styles.container }>
                    <div className="small-12 column">
                        <button
                            className="button small radius"
                            onClick={ this.logout }
                            style={ styles.button }>Log Out</button>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TopBar;
