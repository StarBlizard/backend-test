'use strict';

const passport = require('passport');
const Users    = require('../models/users');
const _        = require('underscore');

module.exports = {

  /*
   *  Register an user
   */
  register(req, res){
    let data = req.body;
    
    Users.create(data).then(() => {
      req.login(data, () => {
        return res.status(200).send(true);
      });
    }).catch( error => {
		  return res.status(401).send(true);
    });
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
