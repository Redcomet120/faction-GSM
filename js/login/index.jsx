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
            username: target.parent().siblings('.username').children('input').val(),
            password: target.parent().siblings('.password').children('input').val()
        };

        Backbone.trigger('login', credentials);
    },

    register: function(e) {
        e.preventDefault();
        this.setState({
            signup: !this.state.signup
        });
    },

    signup: function(e) {
        e.preventDefault();
        var target = $(e.target);
        var conf = target.siblings('.confirm-password').children('input');
        var credentials = {
            username: target.parent().siblings('.username').children('input').val(),
            password: target.parent().siblings('.password').children('input').val(),
            confirmPW: conf.val()
        };

        if(credentials.password === credentials.confirmPW) return Backbone.trigger('signup', credentials);
        conf.css('background', 'red');
    },

    getSignup: function() {
        return (
            <form style={{display: this.state.signup ? 'block' : 'none'}}>
                <label className="confirm-password">
                    <span>Confirm Password:</span>
                    <input type="password" />
                </label>
                <button onClick={this.signup}>Signup</button>
                <button onClick={this.register}>Go back to Login</button>
            </form>
        );
    },
    getLogin: function() {
        return (
            <form style={{display: this.state.signup ? 'none' : 'block'}}>
                <button onClick={this.login}>Login</button>
                <button onClick={this.register}>Register</button>
            </form>
        );
    },
    render: function() {
        return (
            <div className="row">
                <div className="small-12 columns">
                    <label className="username">
                        <span>Username:</span>
                        <input type="text" />
                    </label>
                    <label className="password">
                        <span>Password:</span>
                        <input type="password" />
                    </label>
                    {this.getLogin()}
                    {this.getSignup()}
                </div>
            </div>
        );
    }
});

new LoginModel();

React.render(<Login />, document.getElementById('content'));
