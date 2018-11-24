'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user: {
        type : Sequelize.INTEGER,
        model: 'users',
        key  : 'id'
      },
      products: {
        type: Sequelize.STRING
      },
      total : {
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('carts');
  }
};
