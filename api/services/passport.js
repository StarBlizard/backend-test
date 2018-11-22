'use strict';

module.exports = {

  init(){
    this.passport = require('passport');
    this.passport.use(require('../strategies/local')());
    this.passport.serializeUser(this.serialize);
    this.passport.deserializeUser(this.deserialize);
  },

  serialize(model, done){
    return done(null, model);
  },

  deserialize(user, done){
    return done(null, user);
  }

};
