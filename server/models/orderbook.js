"use strict";

module.exports = function (sequelize, DataTypes) {
  var Orderbook = sequelize.define("Orderbook", {    
    type: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.INTEGER, allowNull: false },
    numberorder: { type: DataTypes.STRING, allowNull: false, unique: true },
    numberid: { type: DataTypes.STRING, allowNull: false, unique: true },
    controlkey: { type: DataTypes.TEXT, allowNull: false },
    numberinit: { type: DataTypes.INTEGER, allowNull: false },
    numberend: { type: DataTypes.INTEGER, allowNull: false },
    numberinvoice: { type: DataTypes.INTEGER, allowNull: false },
    dateofissue: { type: DataTypes.DATE, allowNull: false },
    deadline: { type: DataTypes.DATE, allowNull: false }    
  }, {
      classMethods: {
        associate: function (models) {
          Orderbook.hasMany(models.Salesbook, { foreignKey: 'idorderbook' });
        }
      }
    });
  return Orderbook;
};