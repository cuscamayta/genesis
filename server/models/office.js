"use strict";

module.exports = function (sequelize, DataTypes) {
  var Office = sequelize.define("Office", {
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
    address: { type: DataTypes.STRING, allowNull: true }
  }, 
    {
      classMethods: {
        associate: function (models) {
          Office.belongsTo(models.Destination, { foreignKey: "idorigin" });
          Office.hasMany(models.Travel, { foreignKey: 'idoffice' });
        }
      }
    }
  );
  return Office;
};