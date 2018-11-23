'use strict';

const path           = require('path');
const Sequelize      = require('sequelize');
const { connection } = require(path.join(process.env.PWD, '/services/database'));
const Offers         = require('./offers');
const Discounts      = require('./discounts');

const products = connection.define('products', {
  type: Sequelize.STRING,
  price: Sequelize.INTEGER
}, { timestamps : false });

// associations can be defined here
products.hasMany(Offers, { as : 'offers', foreignKey : 'offerting' });
products.hasMany(Discounts, { as : 'discounts', foreignKey : 'buying' });

module.exports = products;
