'use strict';

const Sequelize      = require('sequelize');
const path           = require('path');
const { connection } = require(path.join(process.env.PWD, '/services/database'));

const Offers = connection.define('offers', {
  offerting: Sequelize.INTEGER,
  gifting: Sequelize.INTEGER
}, { timestamps : false });

module.exports = Offers;
