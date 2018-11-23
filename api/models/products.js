'use strict';

const { connection } = require('../services/database');
const Offers         = require('./offers');
const Discounts      = require('./discounts');
const Sequelize      = require('sequelize');

const products = connection.define('products', {
  type: Sequelize.STRING,
  price: Sequelize.INTEGER
}, { timestamps : false });

// associations can be defined here
products.hasMany(Offers, { as : 'offers', foreignKey : 'offerting' });
products.hasMany(Discounts, { as : 'discounts', foreignKey : 'buying' });

module.exports = products;
