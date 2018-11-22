'use strict';

const passport      = require('../services/passport.js');
const LocalStrategy = require('passport-local').Strategy;
// const User          = require('../models/user.js').user;

module.exports = function(){
    return new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done){

					return done(null, {  username : 'pepe'});
/*
      User.forge( {email : email })
        .fetch()
        .then( model => {

					if(!model){
						console.log("Incorrect email: ", email);
						return done(null, false, { message: 'Incorrect email' })
					};

					if(model.attributes.password != password){
						console.log("Incorrect password: ", model.attributes.password, "!=", password);
						return done(null, false, { message: 'Incorrect password.' });
					};


				});
*/
	});
};
