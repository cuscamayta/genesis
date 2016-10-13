"use strict";

module.exports = function (sequelize, DataTypes) {
  var pisosname = sequelize.define("pisosname", {
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
  }, {
      classMethods: {
        associate: function (models) {
          pisosname.hasMany(models.bus, { foreignKey: 'idpisosname' });
        }
      }
    });
  return pisosname;
};