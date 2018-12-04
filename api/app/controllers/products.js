'use strict';

const path     = require('path');
const passport = require('passport');
const Users    = require(path.join(process.env.PWD, '/db/models/users'));
const Products = require(path.join(process.env.PWD, '/db/models/products'));

module.exports.add = (req, res) => {
  let data = req.body;

  (data.price === undefined) || (data.price = data.price*1);

  Products.create(data).then( () => {
    return res.status(200).send(true);
  }).catch(error => { res.status(500).send(error);  });
};

module.exports.get = (req, res) => {
  let { id } = req.query;

  let cb = products => {
    return res.status(200).send({ count : products.length, results : products });
  };

  if(id || id === 'undefined'){
    Products.find({ where : { id } }).then(cb);
  } else {
    Products.all().then(cb);
  }
};
