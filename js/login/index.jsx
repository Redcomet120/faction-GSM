var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');
var LoginModel = require('../models/login');

window.Backbone = Backbone;
window.$ = $;
window.Backbone.$ = $;

var Login = React.createClass({
    displayName: 'Login',

    getInitialState: function() {
        return {
            signup: false
        };
    },

    login: function(e) {
        e.preventDefault();
        var target = $(e.target);
        var credentials = {
            username: target.siblings('#username').children('input').val(),
            password: target.siblings('#password').children('input').val()
        };

        Backbone.trigger('login', credentials);
    },

    signup: function(e) {
        e.preventDefault();
        var target = $(e.target);
        var credentials = {
            username: target.siblings('#username').children('input').val(),
            password: target.siblings('#password').children('input').val()
        };

        Backbone.trigger('signup', credentials);
    },

    getSignup: function() {
        return (
            <form style={{display: this.state.signup ? 'block' : 'none'}}>
                <label className="username">
                    <span>Username:</span>
                    <input type="text" />
                </label>
                <label className="password">
                    <span>Password:</span>
                    <input type="password" />
                </label>
                <button onClick={this.signup}>Signup</button>
            </form>
        );
    },
    getLogin: function() {
        return (
            <form style={{display: this.state.signup ? 'none' : 'block'}}>
                <label className="username">
                    <span>Username:</span>
                    <input type="text" />
                </label>
                <label className="password">
                    <span>Password:</span>
                    <input type="password" />
                </label>
                <button onClick={this.login}>Login</button>
            </form>
        );
    },
    render: function() {
        return (
            <div className="row">
                <div className="small-12 columns">
                    {this.getLogin()}
                    {this.getSignup()}
                </div>
            </div>
        );
    }
});

new LoginModel();

React.render(<Login />, document.getElementById('content'));
