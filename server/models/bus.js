"use strict";

module.exports = function (sequelize, DataTypes) {
  var Bus = sequelize.define("bus", {
    Placa: { type: DataTypes.STRING, allowNull: false, unique: true },
    color: { type: DataTypes.STRING, allowNull: false },
    pisos: { type: DataTypes.STRING, allowNull: false },
    sofacama: { type: DataTypes.STRING, allowNull: false },
 
  }, {
      getterMethods: {
        fullbus: function () { return this.Placa + " " + this.color + this.pisos + this.sofacama }
      },

      setterMethods: {
        fullbus: function (value) {
          var buses = value.split(" ");
          this.setDataValue("placa ", buses.slice(0, -1).join(" "));
          this.setDataValue("color", buses.slice(-1).join(" "));
          this.setDataValue("pisos", buses.slice(-2).join(" "));
          this.setDataValue("sofacama", buses.slice(-3).join(" "));
        },
      }
    },
    {
    
      classMethods: {
        associate: function (models) {
          Bus.belongsTo(models.user, { foreignKey: "idbus" });
    
    }
    }
  });
  return Bus;
};