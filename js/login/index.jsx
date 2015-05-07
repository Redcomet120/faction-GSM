var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');
var LoginModel = require('../models/login');

window.Backbone = Backbone;
window.$ = $;
window.Backbone.$ = $;

var Login = React.createClass({
    displayName: 'Login',

    login: function(e) {
        e.preventDefault();
        var target = $(e.target);
        var credentials = {
            username: target.siblings('#username').children('input').val(),
            password: target.siblings('#password').children('input').val()
        };

        Backbone.trigger('login', credentials);
    },
    render: function() {
        return (
            <div className="row">
                <div className="small-12 columns">
                    <form>
                        <label id="username">
                            <span>Username:</span>
                            <input type="text" />
                        </label>
                        <label id="password">
                            <span>Password:</span>
                            <input type="password" />
                        </label>
                        <button onClick={this.login}>Login</button>
                    </form>
                </div>
            </div>
        );
    }
});

new LoginModel();

React.render(<Login />, document.getElementById('content'));
