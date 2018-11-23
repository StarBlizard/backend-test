'use strict';

const passport = require('passport');
const path     = require('path');

module.exports.alive = function(req, res){
  res.status(200).send('Ok');
};

module.exports.index = function(req, res){
  if(!req.isAuthenticated()){
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  } else{
    res.redirect("/home");
  }
};

module.exports.home = function(req, res){
  res.sendFile(path.join(__dirname, '../public', 'home.html'));
};
