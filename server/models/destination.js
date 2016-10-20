"use strict";

module.exports = function (sequelize, DataTypes) {
  var Destination = sequelize.define("Destination", {
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
  }, {
      classMethods: {
        associate: function (models) {
          Destination.hasMany(models.Course, { foreignKey: 'iddestination' });
          Destination.hasMany(models.Course, { foreignKey: 'idorigin' });
        }
      }
    });
  return Destination;
};