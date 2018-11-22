const Server       = require('../lib/server');
const passport 	   = require('./passport.js').passport;
const session 	   = require('express-session');
const Logger       = require('../lib/logger');
const bodyParser   = require('body-parser');
const nconf        = require('nconf');
const express      = require('express');
const cookieParser = require('cookie-parser');
const _            = require('underscore');

module.exports = {
  servers : [],

  init : function(){
    Logger.info('[Server service] : Start');

    this.app     = express();

    let settings = nconf.get('Server');
    let server = new Server(this.app, 'http', settings); // Start a basic http server

    this.servers.push(server.cio); // Attach as server

    // We have a https server
    if(settings.SSL && settings.SSL.ENABLED){
      let options = _.clone(settings);
      let server = new Server(this.app, 'https', _.extend(options, settings.SSL)); // Start a https server
      this.servers.push(server.cio); // Attach as server
    }

		this.app.use(cookieParser());

    // addons
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(express.static('public'));

		// Session middlewares
		this.app.use(session({ secret : 'secret', resave: true, saveUninitialized: true }));
		this.app.use(passport.initialize());
    this.app.use(passport.session());

    // Log activity
    this.app.use(function(req, res, next){
      let remoteAddress = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      Logger.info('[Middleware]', 'Incomming request', `${remoteAddress} ${req.method} ${req.url}`);
      return next();
    });

    return this;
  }
};
