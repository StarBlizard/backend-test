'use strict';

const path     = require('path');
const passport = require('passport');
const Users    = require(path.join(process.env.PWD, '/db/models/users'));
const Products = require(path.join(process.env.PWD, '/db/models/products'));

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
