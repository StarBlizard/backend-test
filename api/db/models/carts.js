'use strict';

const Sequelize      = require('sequelize');
const path           = require('path');
const { connection } = require(path.join(process.env.PWD, '/services/database'));
const CartDiscounts  = require('./cartdiscounts');
const CartGifts      = require('./cartgifts');

const carts = connection.define('carts', {
  user: Sequelize.INTEGER,
  products: Sequelize.STRING,
  total: Sequelize.INTEGER
}, { timestamps : false });

carts.hasMany(CartDiscounts, { as : "discounts", foreignKey : "cart" })
carts.hasMany(CartGifts    , { as : "gifts"    , foreignKey : "cart" })

module.exports = carts;
