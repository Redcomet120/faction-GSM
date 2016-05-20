var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');

// Models
var LoginModel = require('../../../models/login');
var RegisterModel = require('../../../models/register');
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
            username: target.parent().parent().find('.username').val(),
            password: target.parent().parent().find('.password').val()
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

    render: function() {
        return (
            <div className="loginBody">
                <div className="loginCont">
                    <div>
                        <img src="/static/img/logo.png" className="img-rounded" alt="Faction Logo" width="300"/>
                    </div>
                    <div className="loginForm">
                        <div className="btn-group">
                            <button className="btn btn-info" onClick={this.login}>Login</button>
                            <button className="btn btn-info">Register</button>
                       </div>
                        <div className="form-group">
                            <label form="username"><i className="fa fa-user"/>
                                Username:
                            </label>
                            <br/>
                            <input type="text" className="username" />
                        </div>
                        <div className="form-group">
                            <label form="password">
                                <i className="fa fa-key"/>
                                Password:
                            </label>
                            <br/>
                            <input type="password" className="password" />
                         </div>
                    </div>
                 </div>
            </div>
        );
    }
});

React.render(<Login />, document.getElementById('content'));
