var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');
var TopBar = require('../topbar');
var Footer = require('../footer');

var Init = React.createClass({
    displayName: 'Init',

    componentDidMount: function(){
        window.Backbone = Backbone;
        window.$ = $;
        window.Backbone.$ = $;
    },

    render: function() {
        return (
            <div >
                <div>
                    <TopBar />
                    <Footer />
                </div>
            </div>
        );
    }
});

React.render(<Init />, document.getElementById('content'));
