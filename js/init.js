var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');

window.Backbone = Backbone;
window.$ = $;

var Init = React.createClass({
    displayName: 'Init',

    render: function() {
        /* jshint ignore:start */
        return (
            <div>Hello World</div>
        );
        /* jshint ignore:end */
    }
});

/* jshint ignore:start */
React.render(<Init />, document.getElementById('content'));
/* jshint ignore:end */
