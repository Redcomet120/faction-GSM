var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');

window.Backbone = Backbone;
window.$ = $;

var Init = React.createClass({
    displayName: 'Init',

    logout: function() {
        Backbone.history.navigate('/logout', {trigger: true, replace: true});
    },

    render: function() {
        return (
            <div>
                <div>Hello World</div>
                <button onclick={this.logout}>Log Out</button>
            </div>
        );
    }
});

React.render(<Init />, document.getElementById('content'));
