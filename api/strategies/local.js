'use strict';

const passport      = require('../services/passport');
const LocalStrategy = require('passport-local').Strategy;
const Users         = require('../db/models/users');

module.exports = function(){
    return new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done){
      Users.findOne({ where : { email } }).then( user => {
					if(!user){
						console.log("Incorrect email: ", email);
						return done(null, false, { message: 'Incorrect email' })
					};

					if(user.get('password') != password){
						console.log("Incorrect password: ", user.get('password'), "!=", password);
						return done(null, false, { message: 'Incorrect password.' });
					};

					return done(null, user.toJSON());
      });
	});
};
