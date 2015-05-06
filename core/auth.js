//==================== Auth module=========
var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');

//mysql connection ....we may want to move this somewhere else later
var connection = mysql.createConnection({
    host     : 'localhost',
    database : 'dongs',
    user     : 'dongs',
    password : 'D0ng$'
});

//setup passport login session
module.exports = function(passport)
{
    passport.serializeUser(function(user, done){
        done(null, user.uid);
    });

    passport.deserializeUser(function(uid,done){
        connection.query("SELECT * FROM `users` WHERE `uid` = '" + uid + "'", function(err, rows){
            done(err, rows[0]);
        });
    });

    //Local signup
    passport.use('local-signup', new LocalStrategy({
        userField       : 'username',
        passwordField   : 'password',
        serverkey       : 'serverkey',
        passReqToCallback : true
    },

    function(req, username, password, serverkey,done){
    // check to make sure they are not already a user
        connection.query("SELECT * FROM 'users' WHERE 'username' = '"+ username +"'", function(err,rows){
            console.log(rows);
            if(err)
                return done(err);
            if(rows.length){
                return done(null, false, req.flash('signupMessage' , 'that user already exists.'));
            }
            //check if serverkey matches
            if(serverkey == "bacon"){
                //create user if he doesn' already exist
                var newUserMysql = new Object();
                newUserMysql.username = username;
                //I think this is plaintext for now need to hash
                newUserMysql.password = password;
                var insertQuery = "INSERT INTO 'users' ( username, password ) values ('" + username +"','"+ password + "')";
                console.log(insertQuery);
                connection.query(insertQuery,function(err,rows){
                    newUserMysql.uid = rows.insertedId;
                    return done(null, newUserMysql);
                });
            }
            else{
                req.flash('signupMessage' , 'Your server Key is invalid');
            }
        });

    }));

    //local Login
    passport.use('local-login',
        new LocalStrategy({
                usernameField   : 'username',
                passwordField   : 'password',
                passReqToCallback : true
            },
            function(req, username, password, done){
                connection.query("SELECT * FROM `users` WHERE `username` = '" + username + "'", function(err, rows){
                    if(err)
                        return done(err);
                    //check for credentials
                    if(rows.length && rows[0].password == password){
                        //return successful user
                        return done(err, rows[0], req);
                    }
                    req.flash('loginMessage', 'Cannot find your username or password.');
                    return done(err, false, req);

                });
            }
        )
    );
};
