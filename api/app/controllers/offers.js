'use strict';

const path     = require('path');
const passport = require('passport');
const Offers   = require(path.join(process.env.PWD, '/db/models/offers'));

let offersController = {};

offersController.add = function(req, res){
  let data = req.body;
  Offers.create(data).then( () => {
    return res.status(200).send(true);
  });
};

module.exports = offersController;
