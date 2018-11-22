'use strict';
module.exports = (sequelize, DataTypes) => {
  const offers = sequelize.define('offers', {
    buying: DataTypes.STRING,
    howMany: DataTypes.NUMBER,
    discounting: DataTypes.NUMBER,
    discounted: DataTypes.STRING
  }, {});
  offers.associate = function(models) {
    // associations can be defined here
  };
  return offers;
};