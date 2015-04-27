var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');

window.Backbone = Backbone;
window.$ = $;

var Login = React.createClass({
    displayName: 'Login',

    render: function() {
        /* jshint ignore:start */
        return (
            <div>This will be the login page</div>
        );
        /* jshint ignore:end */
    }
});

/* jshint ignore:start */
React.render(<Login />, document.getElementById('content'));
/* jshint ignore:end */
