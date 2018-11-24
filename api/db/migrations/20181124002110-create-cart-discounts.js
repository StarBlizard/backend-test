'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cartDiscounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cart : {
        type: Sequelize.INTEGER,
        model: 'carts',
        key  : 'id'
      },
      product: {
        type: Sequelize.INTEGER,
        model: 'product',
        key  : 'id'
      },
      discountID: {
        type: Sequelize.INTEGER,
        model: 'discounts',
        key  : 'id'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cartDiscounts');
  }
};
