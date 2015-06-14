var React = require('react');
var styles = require('./styles');

var TopBar = React.createClass({
    displayName: 'Top Bar',

    render: function() {
        return (
            <div style={ styles.topbar }>
                <div className="row" style={ styles.container }>
                    <div className="small-12 column">
                        <span>{ "Hidely Ho, " + this.props.user + "erino" }</span>
                        <a className="button small radius" href="/logout" style={ styles.button }>
                            Log Out
                        </a>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TopBar;
