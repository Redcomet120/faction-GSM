var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');

var InitLogin = React.createClass({
    displayName: "Init Dongs",

    render: function() {
        return (
            <html>
                <head>
                    <title>DONGS</title>
                    <link rel="stylesheet" type="text/css" href="/static/css/app.css" />
                </head>
                <body>
                    <div id="content" />
                    <script src="/static/js/index.js" />
                </body>
            </html>
        );
    }
});

module.exports = InitLogin;
