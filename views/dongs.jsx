var React = require('react');
var TopBar = require('./components/topbar');
var Footer = require('./components/footer');

var DongsView = React.createClass({
    displayName: "Dongs View",

    render: function() {
        return (
            <html style={{ height: "100%" }}>
                <head>
                    <title>DONGS</title>
                    <link rel="stylesheet" type="text/css" href="/static/css/app.css" />
                </head>
                <body style={{ height: "100%" }}>
                    <TopBar user={ this.props.user } />
                    <div id="content" style={{ height: "100%" }} />
                    <Footer />
                    <script src="/static/js/index.js" />
                </body>
            </html>
        );
    }
});

module.exports = DongsView;
