var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');
var TopBar = require('./components/topbar');

var DongsView = React.createClass({
    displayName: "Dongs View",

    render: function() {
        return (
            <html style={{ height: "100%" }}>
                <head>
                    <title>DONGS</title>
                    <link rel="stylesheet" type="text/css" href="/static/css/app.css" />
                </head>
                <body style={{ height: "100%", background: "url('/static/img/url.jpg')", backgroundSize: "cover" }}>
                    <TopBar user={ this.props.user } />
                    <div id="content"/>
                    <script src="/static/js/index.js" />
                </body>
            </html>
        );
    }
});

module.exports = DongsView;
