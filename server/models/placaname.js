"use strict";

module.exports = function (sequelize, DataTypes) {
  var placaname = sequelize.define("placaname", {
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
  }, {
      classMethods: {
        associate: function (models) {
          placaname.hasMany(models.bus, { foreignKey: 'idplacaname' });
        }
      }
    });
  return placaname;
};