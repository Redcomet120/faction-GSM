var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');

var InitLogin = React.createClass({
    displayName: "Init Login",

    render: function() {
        return (
            <html>
                <head>
                    <title>DONGS Login</title>
                    <link rel="stylesheet" type="text/css" href="/static/css/app.css" />
                </head>
                <body>
                    <div id="content" />
                    <script src="/static/js/login.js" />
                </body>
            </html>
        );
    }
});

module.exports = InitLogin;
