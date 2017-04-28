import express from 'express';
const app = express();
import path from 'path';
import request from 'request'
import passport from 'passport'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import {Strategy} from 'passport-local'

app.use(bodyParser.json());
app.use(cookieParser());

app.use(require('express-session')({
    cookie: {
        maxAge: 3600000,
        secure: false
    },
    secret: 'randomSecret',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new Strategy(
    function (username, password, done) {
        let url = "https://swapi.co/api/people/?search=" + encodeURI(username);
        request(url, function (err, result) {
            if (err) {
                return done(err);
            }
            let sw_user = '';
            let sw_pwd = '';
            let sw_res = {};
            if (result.body) {
                try {
                    sw_res = JSON.parse(result.body);
                    if (sw_res.count && sw_res.results && sw_res.results[0]) {
                        sw_user = sw_res.results[0].name;
                        sw_pwd = sw_res.results[0].birth_year;
                    }
                } catch (e) {
                    sw_res = {};
                }
            }
            if (!sw_user || (!(sw_user === username)) || (!(sw_pwd === password))) {
                return done(null, false);
            }
            return done(null, sw_res.results[0]);
        });
    }
));

app.get('/', express.static(path.join(__dirname, '/../client/build')));


app.get('/api/user', function (req, res) {
    let url = "https://swapi.co/api/people/?search=" + encodeURI(req.query.name);
    request(url, function (err, result) {
        res.json(JSON.parse(result.body));
    });

});


app.post('/api/login', passport.authenticate('local', {failWithError: true}),
    function (req, res) {
        let limit = 15;
        if (req.body.username === 'Luke Skywalker'){
            limit = undefined;
        }
        return res.json({status: "ok", limit: limit});
    },
    function (err, req, res, next) {
        return res.json(err);
    });

app.post('/api/search', function (req, res) {
    let url = "https://swapi.co/api/planets/?search=" + encodeURI(req.body.name);
    request(url, function (err, result) {
        res.json(JSON.parse(result.body));
    });
});

app.get('/api/logout', function (req, res) {
    req.logout();
    res.json({status: "ok"});
});

app.use('/', express.static(path.join(__dirname, '/../client/build')));

app.get('*', (request, response) => {
    response.header('Content-type', 'text/html');
    response.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});