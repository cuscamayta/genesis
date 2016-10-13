"use strict";

module.exports = function (sequelize, DataTypes) {
  var Bus = sequelize.define("bus", {
    Placaname: { type: DataTypes.STRING, allowNull: false, unique: true },
    colorname: { type: DataTypes.STRING, allowNull: false },
    pisosname: { type: DataTypes.STRING, allowNull: false },
    sofacama: { type: DataTypes.STRING, allowNull: false },
 
  }, {
      getterMethods: {
        fullBus: function () { return this.placaname + " " + this.colorname + this.pisosname + this.sofacama}
      },

      setterMethods: {
        fullBus: function (value) {
          var names = value.split(" ");

          this.setDataValue("placaname", names.slice(0, -1).join(" "));
          this.setDataValue("colorname", names.slice(-1).join(" "));
          this.setDataValue("pisosname", names.slice(-1).join(" "));
          this.setDataValue("sofacama", names.slice(-1).join(" "));
        },
      }
    },
    {
      classMethods: {
        associate: function (models) {
          User.belongsTo(models.placaname, { foreignKey: "idplacaname" });
          {
          User.belongsTo(models.colorname, { foreignKey: "idcolorname" });
          {
          User.belongsTo(models.pisosname, { foreignKey: "idpisosname" });
        }
        {
          User.belongsTo(models.sofacama, { foreignKey: "idsofacama" });
      }
      }
    }
    }
  });
  return Bus;
};