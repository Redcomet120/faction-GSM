var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');
var TopBar = require('./views/topbar');
var Footer = require('./views/footer');

window.Backbone = Backbone;
window.$ = $;

var Init = React.createClass({
    displayName: 'Init',

    render: function() {
        return (
            <div>
                <TopBar />
                <Footer />
            </div>
        );
    }
});

React.render(<Init />, document.getElementById('content'));
