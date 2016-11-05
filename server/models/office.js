"use strict";

module.exports = function (sequelize, DataTypes) {
  var Office = sequelize.define("Office", {
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
    address: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    detail: { type: DataTypes.STRING, allowNull: true }
  }, 
    {
      classMethods: {
        associate: function (models) {
          Office.belongsTo(models.Destination, { foreignKey: "idorigin" });
          Office.hasMany(models.Useroffice, { foreignKey: 'idofficeuser' });
          Office.hasMany(models.Orderbook, { foreignKey: 'idoffice' });
        }
      }
    }
  );
  return Office;
};