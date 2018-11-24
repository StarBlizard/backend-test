'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cartGifts', {
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
        model: 'products',
        key  : 'id'
      },
      number: {
        type: Sequelize.INTEGER
      },
      giftID: {
        type: Sequelize.INTEGER,
        model: 'products',
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
    return queryInterface.dropTable('cartGifts');
  }
};
