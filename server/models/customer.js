"use strict";

module.exports = function (sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    numberid: {
      type: DataTypes.STRING, allowNull: false, unique: true,
      set: function (val) {
        this.setDataValue('numberid', val.toUpperCase());
      }
    },
    firstname: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, validate: { isEmail: true } },
  },
    {
      classMethods: {
        associate: function (models) {
          Customer.hasMany(models.Ticket, { foreignKey: "idcustomer" });
        }
      }
    },
    {
      getterMethods: {
        fullName: function () { return this.firstname + ' ' + this.lastname }
      },

      setterMethods: {
        fullName: function (value) {
          var names = value.split(' ');

          this.setDataValue('firstname', names.slice(0, -1).join(' '));
          this.setDataValue('lastname', names.slice(-1).join(' '));
        },
      }
    });
  return Customer;
};