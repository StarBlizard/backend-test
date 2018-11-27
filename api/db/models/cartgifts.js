'use strict';

const path           = require('path');
const Sequelize      = require('sequelize');
const { connection } = require(path.join(process.env.PWD, '/services/database'));
const Carts          = require('./carts');
const Gifts          = require('./gifts');

const cartGifts = connection.define('cartGifts', {
  cart: Sequelize.INTEGER,  // Product that is being discounted
  product: Sequelize.INTEGER,  // Product that is being discounted
  number: Sequelize.INTEGER,   // Quantity of the product that is being gifted on the cart
  giftID: Sequelize.INTEGER,   // ID of the gift on the Gifts table 
  }, {});

module.exports = cartGifts;
