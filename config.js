module.exports = {
    mysql: {
        host     : 'localhost',
        database : 'dongs',
        user     : 'dongs',
        password : 'D0ng$'
    },
    session: {
        secret: 'baconTech',
        saveUninitialized: true,
        resave: true,
        cookie: { maxAge: 3600000 }
    }
};
