'use strict';

const path     = require('path');
const passport = require('passport');
const Users    = require(path.join(process.env.PWD, '/db/models/users'));
const Products = require(path.join(process.env.PWD, '/db/models/products'));

module.exports.add = (req, res) => {
  let data = req.body;
  Products.create(data).then( () => {
    return res.status(200).send(true);
  });
};

module.exports.get = (req, res) => {
  let { id } = req.query;

  if(id){
    Products.findOne({ where : { id } }).then( products => {
      return res.status(200).send(products);
    });
  } else {
    Products.all().then( products => {
      return res.status(200).send(products);
    });
  }
};
