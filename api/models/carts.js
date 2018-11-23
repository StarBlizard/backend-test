'use strict';

const { connection } = require('../services/database');
const Sequelize      = require('sequelize');

const carts = connection.define('carts', {
  user: Sequelize.INTEGER,
  products: Sequelize.STRING
}, { timestamps : false });

carts.associate = function(models) {
  carts.belongsTo(models.users);
};

module.exports = carts;
