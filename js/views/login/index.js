var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');

// Models
var LoginModel = require('../../models/login');
var RegisterModel = require('../../models/register');
new LoginModel();
new RegisterModel();

var Login = React.createClass({
    displayName: 'Login',

    componentDidMount: function(){
        window.Backbone = Backbone;
        window.$ = $;
        window.Backbone.$ = $;
    },

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

        if(credentials.password === credentials.confirmPW) return Backbone.trigger('register', credentials);
        conf.css('background', 'red');
    },

    getContent: function() {
        if(this.state.signup)
            return (
                <form>
                    <label className="confirm-password">
                        <span>Confirm Password:</span>
                        <input type="password" />
                    </label>
                    <button onClick={this.signup}>Register</button>
                    <button onClick={this.register}>Go back to Login</button>
                </form>
            );

        return (
            <form>
                <button onClick={this.login}>Login</button>
                <button onClick={this.register}>Register</button>
            </form>
        );
    },
    render: function() {
        return (
            <div className="row">
                <div className="small-12 columns">
                    <h1>Welcome to Dongs!</h1>
                    <label className="username">
                        <span>Username:</span>
                        <input type="text" />
                    </label>
                    <label className="password">
                        <span>Password:</span>
                        <input type="password" />
                    </label>
                    {this.getContent()}
                </div>
            </div>
        );
    }
});

React.render(<Login />, document.getElementById('content'));
