var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('lodash');
var React = require('react');

window.Backbone = Backbone;
window.$ = $;

var Login = React.createClass({
    displayName: 'Login',

    login: function(e) {
        e.preventDefault();
        var target = $(e.target);
        var labels = target.siblings('label input');
        _.each(labels, function(label) {
            console.log($(label).val());
        });
    },
    render: function() {
        return (
            <div>This will be the login page
                <div className="row">
                    <div className="small-12 columns">
                        <form>
                            <label>
                              <span>Username:</span>
                                <input type="text" />
                            </label>
                            <label>
                                <span>Password:</span>
                                <input type="password" />
                            </label>
                            <button onClick={this.login}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

//styling login box
var divStyle = {
    color:'red'
};
React.render(<Login />, document.getElementById('content'));
