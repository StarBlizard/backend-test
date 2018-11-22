'use strict';
module.exports = (sequelize, DataTypes) => {
  const carts = sequelize.define('carts', {
    user: DataTypes.NUMBER,
    products: DataTypes.STRING,
    total: DataTypes.NUMBER
  }, {});
  carts.associate = function(models) {
    carts.belongsTo(models.users);
  };
  return carts;
};
