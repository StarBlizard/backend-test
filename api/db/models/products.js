'use strict';

const path           = require('path');
const Sequelize      = require('sequelize');
const { connection } = require(path.join(process.env.PWD, '/services/database'));
const Gifts          = require('./gifts');
const Discounts      = require('./discounts');

const products = connection.define('products', {
  type: Sequelize.STRING,
  price: Sequelize.INTEGER
}, { timestamps : false });

// associations can be defined here
products.hasMany(Gifts,     { as : 'gifts',     foreignKey : 'buying' });
products.hasMany(Discounts, { as : 'discounts', foreignKey : 'discounted' });

module.exports = products;
