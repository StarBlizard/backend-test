'use strict';

const { connection } = require('../services/database');
const Sequelize      = require('sequelize');

const Users = connection.define('User', {
  email: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING
}, {});

Users.associate = function(models) {
  // associations can be defined here
};

module.exports = Users;
