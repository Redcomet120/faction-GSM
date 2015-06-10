var React = require('react');

var InitLogin = React.createClass({
    displayName: "Init Dongs",

    render: function() {
        return (
            <html style={{ height: "100%" }}>
                <head>
                    <title>DONGS</title>
                    <link rel="stylesheet" type="text/css" href="/static/css/app.css" />
                </head>
                <body style={{ height: "100%" }}>
                    <div id="content" style={{ height: "100%" }} />
                    <script src="/static/js/index.js" />
                </body>
            </html>
        );
    }
});

module.exports = InitLogin;
