'use strict';

const Sequelize      = require('sequelize');
const path           = require('path');
const { connection } = require(path.join(process.env.PWD, '/services/database'));

const Gifts = connection.define('gifts', {
  buying: Sequelize.INTEGER,
  gifting: Sequelize.INTEGER,
  number: Sequelize.INTEGER
}, { timestamps : false });

module.exports = Gifts;
