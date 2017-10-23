'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var bodyParser = require("body-parser");
var path = require("path");
var app = module.exports = loopback();

// Passport configurators..
var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);
var cookieParser = require('cookie-parser');
var session = require('express-session');

/**
 * Flash messages for passport
 *
 * Setting the failureFlash option to true instructs Passport to flash an
 * error message using the message given by the strategy's verify callback,
 * if any. This is often the best approach, because the verify callback
 * can make the most accurate determination of why authentication failed.
 */
var flash      = require('express-flash');

// attempt to build the providers/passport config
var config = {};
try {
  // config = require('../providers.json');
  config = require('../providers.js');
} catch (err) {
  console.trace(err);
  process.exit(1); // fatal
}

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// The access token is only available after boot
app.middleware('auth', loopback.token({
  model: app.models.accessToken,
}));

// app.middleware('session:before', cookieParser(app.get('cookieSecret')));
// app.middleware('session:before', cookieParser());
app.middleware('session', session({
  // secret: 'kitty',
  secret: 'isyocookie',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 2678400000 // 31 days
  },
}));
// app.use(session({
//   // key: "mysite.sid.uid.whatever",
//   // secret: process.env["SESSION_SECRET"],
//   cookie: {
//     maxAge: 2678400000 // 31 days
//   },
// }));
passportConfigurator.init();

// We need flash messages to see passport errors
app.use(flash());


// app.set('views', path.join(__dirname, 'views'));
app.set('views', './server/views');
// app.set('view engine', 'jade');
app.set('view engine', 'ejs');

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
	  app.use(loopback.static('client/public'));
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

passportConfigurator.setupModels({
  userModel: app.models.user,
  userIdentityModel: app.models.userIdentity,
  userCredentialModel: app.models.userCredential,
});
for (var s in config) {
  var c = config[s];
  c.session = c.session !== false;
  passportConfigurator.configureProvider(s, c);
}
