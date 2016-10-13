"use strict";

module.exports = function (sequelize, DataTypes) {
  var colorname = sequelize.define("colorname", {
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
  }, {
      classMethods: {
        associate: function (models) {
          colorname.hasMany(models.bus, { foreignKey: 'idcolorname' });
        }
      }
    });
  return colorname;
};