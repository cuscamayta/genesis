"use strict";

module.exports = function (sequelize, DataTypes) {
  var Salesbook = sequelize.define("Salesbook", {    
    type: { type: DataTypes.INTEGER, allowNull: false },
    numberorder: { type: DataTypes.STRING, allowNull: false },
    numbercontrol: { type: DataTypes.STRING, allowNull: false, unique: true },
    numberid: { type: DataTypes.STRING, allowNull: false, unique: true },
    fullname: { type: DataTypes.STRING, allowNull: false },
    numbersales: { type: DataTypes.INTEGER, allowNull: false },
    numberinvoice: { type: DataTypes.INTEGER, allowNull: false },
    dateregister: { type: DataTypes.DATE, allowNull: false },
    amountinvoice: { type: DataTypes.DECIMAL, allowNull: false },
    amountinvoiceice: { type: DataTypes.DECIMAL, allowNull: false },
    amountinvoiceexento: { type: DataTypes.DECIMAL, allowNull: false },
    amountinvoicenet: { type: DataTypes.DECIMAL, allowNull: false },
    amountoftax: { type: DataTypes.DECIMAL, allowNull: false }    
  },
    {
      classMethods: {
        associate: function (models) {
          Salesbook.belongsTo(models.Orderbook, { foreignKey: "idorderbook" });
        }
      }
    }
  );
  return Salesbook;
};