'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('discounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      buying: {
        type: Sequelize.INTEGER
      },
      howMany: {
        type: Sequelize.INTEGER
      },
      discounting: {
        type: Sequelize.INTEGER
      },
      discounted: {
        type: Sequelize.INTEGER,
        model: 'products',
        key  : 'id'
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('discounts');
  }
};
