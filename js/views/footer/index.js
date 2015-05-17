var React = require('react');
var styles = require('./styles');

var Footer = React.createClass({
    displayName: 'Footer',

    render: function() {
        return (
            <div className="row" style={ styles.container }>
                Faction Productions
            </div>
        );
    }
});

module.exports = Footer;
