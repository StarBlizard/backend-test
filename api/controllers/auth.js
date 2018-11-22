'use strict';

const passport = require('passport');
// const User     = require('../models/user.js').user;

module.exports = {

  /*
   *  Register an user
   */
  register(req, res){
    let data = req.body;

		return res.status(200).send(true);
  },


  /*
   *  Login callback
   */
  granted(req, res){
    console.log(req.session.passport.user);
    return res.status(200).send("Hello user");
  },


  /*
   *  Logout
   */
  logout(req, res){
    passport.authenticate('local', { session : false });
    req.session.destroy();
		req.logout();
		return res.render('index');
  }
};
