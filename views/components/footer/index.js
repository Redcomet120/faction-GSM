var React = require('react');
var styles = require('./styles');

var Footer = React.createClass({
    displayName: 'Footer',

    render: function() {
        return (
            <div style={ styles.footer }>
                <div className="row">
                    <div className="small-12 column">
                        Faction Productions
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Footer;
