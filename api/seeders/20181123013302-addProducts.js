'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('products', [{
        id : 1,
        type: 'shirt',
        price: 150
      },{
        id : 2,
        type: 'shoes',
        price: 180
      },{
        id : 3,
        type: 'pants',
        price: 200
      }], {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
