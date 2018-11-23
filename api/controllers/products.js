'use strict';

const passport = require('passport');
const Users    = require('../models/users');
const Carts    = require('../models/carts');
const Products = require('../models/products');

let productsController = {};

productsController.add = function(req, res){
  let data = req.body;
  Products.create(data).then( () => {
    return res.status(200).send(true);
  });
};

productsController.get = function(req, res){
  Products.all().then( products => {
    return res.status(200).send(products);
  }); 
};

module.exports = productsController;
