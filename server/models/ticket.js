"use strict";

module.exports = function (sequelize, DataTypes) {
    var Ticket = sequelize.define("Ticket", {
        price:  { type: DataTypes.DECIMAL, allowNull: false },
        number: { type: DataTypes.INTEGER, allowNull: false },
    },
        {
            classMethods: {
                associate: function (models) {
                    Ticket.belongsTo(models.Bus, { foreignKey: "idbus" });                    
                    Ticket.belongsTo(models.Schedule, { foreignKey: "idschedule" });
                    Ticket.belongsTo(models.Customer, { foreignKey: "idcustomer" });
                    Ticket.hasMany(models.Salesdetail, { foreignKey: "idticket" });
                }
            }
        }
    );
    return Ticket;
};