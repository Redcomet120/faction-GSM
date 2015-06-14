var React = require('react');

var InitLogin = React.createClass({
    displayName: "Init Login",

    render: function() {
        return (
            <html style={{ height: "100%" }}>
                <head>
                    <title>DONGS Login</title>
                    <link rel="stylesheet" type="text/css" href="/static/css/app.css" />
                </head>
                <body style={{ height: "100%" }}>
                    <div id="content" style={{ height: "100%" }} />
                    <script src="/static/js/login.js" />
                </body>
            </html>
        );
    }
});

module.exports = InitLogin;
