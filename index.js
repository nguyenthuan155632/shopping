'use strict';

var express         = require('express');
var kraken          = require('kraken-js');
var db              = require('./lib/db');
// var session = require('express-session');
var session         = require('client-sessions');
var flash           = require('connect-flash');
var csrf            = require('csurf');
var path            = require('path');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
// var dust = require('dustjs-linkedin');
var User            = require('./models/userModel');

var options, app;

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
    onconfig: function (config, next) {
        /*
         * Add any additional config setup or overrides here. `config` is an initialized
         * `confit` (https://github.com/krakenjs/confit/) configuration object.
         */
         db.config(config.get('databaseConfig'));
        next(null, config);
    }
};

app = module.exports = express();
app.use(kraken(options));

app.use(cookieParser());

// app.use(expressSession({secret:'tj#4$4b!@kjKLoMN_an&8%a'}));

// app.use(bodyParser());

// app.use(session({ cookie: { maxAge: 24*60*60*1000 }, 
//     secret: 'wj#4$4b!@kjKLoMN_an&8%aot',
//     resave: false, 
//     saveUninitialized: false
// }));

app.use(session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  // secure: true,
  ephemeral: true
}));

app.use(function(req, res, next) {
  if (req.session && req.session.user) {
    User.findOne({ email: req.session.user.email }, function(err, user) {
      if (user) {
        req.user = user;
        delete req.user.password; // delete the password from the session
        req.session.user = user;  //refresh the session value
        res.locals.user = user;
      }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
    next();
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Connect Flash
app.use(flash());
app.use(function(req, res, next) {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');

    res.locals.error_login = req.flash('error_login');

    res.locals.success_signup = req.flash('success_signup');
    res.locals.error_signup = req.flash('error_signup');

    next();
});

// app.use(csrf());
// app.use(function(req, res, next) {
//   // res.cookie('XSRF-TOKEN'z, req.csrfToken());
//   res.locals._csrf = req.csrfToken ? req.csrfToken() : '';
//   next();
// });
// app.use(require('less-middleware')(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public')));


app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});

