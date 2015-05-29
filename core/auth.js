//==================== Auth module====================
var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var config = rootRequire('./config.js');
var queries = rootRequire('./helpers/queries');

// MySQL connection
var connection = mysql.createConnection(config.mysql);

// Setup Passport login session
module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.uid);
    });

    passport.deserializeUser(function(uid, done) {
        connection.query(queries.selectFrom('users', 'uid', uid),
            function(err) {
                done(err);
            }
        );
    });

    //Local Signup
    passport.use('local-signup',
        new LocalStrategy({
                userField       : 'username',
                passwordField   : 'password',
                passReqToCallback : true
            },

            function(req, username, password, done) {
                // Check to make sure they are not already a user
                connection.query(queries.selectFrom('users', 'username', username), function(err, rows) {
                    if(err) return done(err);
                    if(rows.length) return done(null, false);
                    // Create user
                    var newUserMysql = new Object();
                    newUserMysql.username = username;
                    //TODO: Encrypt password
                    newUserMysql.password = password;
                    connection.query(queries.insertInto('users', ['username', 'password'], [username, password]), function(err, rows) {
                        newUserMysql.uid = rows.insertId;
                        return done(null, newUserMysql);
                    });
                });
            }
        )
    );

    // Local Login
    passport.use('local-login',
        new LocalStrategy({
                usernameField   : 'username',
                passwordField   : 'password',
                passReqToCallback : true
            },
            function(req, username, password, done) {
                connection.query(queries.selectFrom('users', 'username', username), function(err, rows) {
                    if(err) return done(err);
                    // Check for credentials
                    if(rows.length && rows[0].password == password) {
                        // Return successful user
                        return done(err, rows[0]);
                    }
                    return done(null, false);
                });
            }
        )
    );
};
