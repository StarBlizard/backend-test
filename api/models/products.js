'use strict';
module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    type: DataTypes.STRING,
    price: DataTypes.NUMBER
  }, {});
  products.associate = function(models) {
    // associations can be defined here
  };
  return products;
};