'use strict';

const Sequelize      = require('sequelize');
const path           = require('path');
const { connection } = require(path.join(process.env.PWD, '/services/database'));

const Discounts = connection.define('discounts', {
  buying: Sequelize.INTEGER,
  howMany: Sequelize.INTEGER,
  discounting: Sequelize.INTEGER,
  discounted: Sequelize.INTEGER
}, { timestamps : false });

module.exports = Discounts;
