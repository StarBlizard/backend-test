'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('gifts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      buying : {
        type: Sequelize.INTEGER,
        model: 'products',
        key  : 'id'
      },
      gifting : {
        type: Sequelize.INTEGER
      },
      number : {
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('gifts');
  }
};
