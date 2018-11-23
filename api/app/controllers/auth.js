'use strict';

const path     = require('path');
const passport = require('passport');
const Users    = require(path.join(process.env.PWD, '/db/models/users'));
const _        = require('underscore');

module.exports = {

  /*
   *  Register an user
   */
  register(req, res){
    if(req.isAuthenticated()){ return res.redirect("/home"); }

    let data = req.body;
    
    Users.create(data).then(() => {
      req.login(data, () => {
        return res.status(200).send(req.user);
      });
    }).catch( error => {
		  return res.status(401).send(error);
    });
  },


  /*
   *  Login callback
   */
  granted(req, res){
    return res.status(200).send(req.user);
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
