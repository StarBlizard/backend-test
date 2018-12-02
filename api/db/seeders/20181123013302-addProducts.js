'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('products', [{
        id : 1,
        name: 'shirt',
        price: 150
      },{
        id : 2,
        name: 'shoes',
        price: 180
      },{
        id : 3,
        name: 'pants',
        price: 200
      }], {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
