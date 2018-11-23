'use strict';

const { connection } = require('../services/database');
const Sequelize      = require('sequelize');

const Discounts = connection.define('discounts', {
  buying: Sequelize.INTEGER,
  howMany: Sequelize.INTEGER,
  discounting: Sequelize.INTEGER,
  discounted: Sequelize.INTEGER
}, { timestamps : false });

module.exports = Discounts;
