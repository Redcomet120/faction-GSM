var React = require('react');
var Button = React.createClass({
    render: function() {
        return (
            <button
                className={ this.props.className + " button small radius" }
                onClick={ this.props.onClick }
                style={ this.props.style }
            >
                { this.props.children }
            </button>
        );
    }
});

module.exports = Button;
