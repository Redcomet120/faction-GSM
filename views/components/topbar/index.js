var React = require('react');
var Backbone = require('backbone');
var Button = require('../common/button');
var styles = require('./styles');

var TopBar = React.createClass({
    displayName: 'Top Bar',

    navToLogout: function() {
        Backbone.history.navigate('/logout', {trigger: true});
    },

    render: function() {
        return (
            <div style={ styles.topbar }>
                <div className="row" style={ styles.container }>
                    <span className="small-offset-7 small-3 column">{ "Hidely Ho, " + this.props.user + "erino" }</span>
                    <Button className="small-2 column" onClick={ this.navToLogout }>
                        Log Out
                    </Button>
                </div>
            </div>
        );
    }
});

module.exports = TopBar;
