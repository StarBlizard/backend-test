'use strict';

const Sequelize      = require('sequelize');
const path           = require('path');
const { connection } = require(path.join(process.env.PWD, '/services/database'));

const Users = connection.define('users', {
  email: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING
}, {});

Users.associate = function(models) {
  // associations can be defined here
};

module.exports = Users;
