"use strict";

module.exports = function (sequelize, DataTypes) {
  var Course = sequelize.define("Course", {
    numberid: { type: DataTypes.STRING, allowNull: false, unique: true },
    detail: { type: DataTypes.STRING, allowNull: true }
  },
    {
      classMethods: {
        associate: function (models) {
          Course.belongsTo(models.Destination, { foreignKey: "iddestination" });
        }
      }
    }
  );
  return Course;
};