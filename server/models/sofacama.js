"use strict";

module.exports = function (sequelize, DataTypes) {
  var sofacama = sequelize.define("sofacama", {
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
  }, {
      classMethods: {
        associate: function (models) {
          sofacama.hasMany(models.bus, { foreignKey: 'idsofacama' });
        }
      }
    });
  return sofacama;
};