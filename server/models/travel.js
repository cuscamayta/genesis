"use strict";

module.exports = function (sequelize, DataTypes) {
  var Travel = sequelize.define("Travel", {
    numberid: { type: DataTypes.STRING, allowNull: false, unique: true },
    detail: { type: DataTypes.STRING, allowNull: true }
  },
    {
      classMethods: {
        associate: function (models) {
          Travel.belongsTo(models.Bus, { foreignKey: "idbus" });
          Travel.belongsTo(models.Course, { foreignKey: "idcourse" });  
          Travel.hasMany(models.Schedule, { foreignKey: "idtravel" });        
        }
      }
    }
  );
  return Travel;
};