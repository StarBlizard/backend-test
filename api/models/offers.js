'use strict';

const { connection } = require('../services/database');
const Sequelize      = require('sequelize');

const Offers = connection.define('offers', {
  offerting: Sequelize.INTEGER,
  gifting: Sequelize.INTEGER
}, { timestamps : false });

module.exports = Offers;
