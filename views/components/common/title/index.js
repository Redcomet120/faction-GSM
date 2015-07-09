var React = require('react');
var _ = require('lodash');
var COLORS = require('../styles/colors');
var FONTS = require('../styles/fonts');
var styles = {
    color: COLORS.black(),
    fontSize: FONTS.title
};

var Title = React.createClass({
    render: function() {
        return (
            <h2 style={ _.extend({}, styles, this.props.style) } className={ this.props.className }>
                { this.props.children }
            </h2>
        );
    }
});

module.exports = Title;
