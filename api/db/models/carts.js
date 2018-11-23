'use strict';

const Sequelize      = require('sequelize');
const path           = require('path');
const { connection } = require(path.join(process.env.PWD, '/services/database'));

const carts = connection.define('carts', {
  user: Sequelize.INTEGER,
  products: Sequelize.STRING
}, { timestamps : false });

carts.associate = function(models) {
  carts.belongsTo(models.users);
};

module.exports = carts;
