'use strict';

const passport = require('passport');
const Offers   = require('../models/offers');

let offersController = {};

offersController.add = function(req, res){
  let data = req.body;
  Offers.create(data).then( () => {
    return res.status(200).send(true);
  });
};

module.exports = offersController;
