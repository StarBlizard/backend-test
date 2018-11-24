'use strict';

const path           = require('path');
const Sequelize      = require('sequelize');
const { connection } = require(path.join(process.env.PWD, '/services/database'));
const Carts          = require('./carts');
const Discounts      = require('./discounts');

const cartDiscounts = connection.define('cartDiscounts', {
  cart: Sequelize.INTEGER,  // Product that is being discounted
  product: Sequelize.INTEGER,  // Product that is being discounted
  discountID: Sequelize.INTEGER,  // Discount ID on the Discounts Table 
});

module.exports = cartDiscounts;
