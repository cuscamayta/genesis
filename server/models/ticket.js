"use strict";

module.exports = function (sequelize, DataTypes) {
    var Ticket = sequelize.define("Ticket", {
        numberid: { type: DataTypes.STRING, allowNull: false },
        fullname: { type: DataTypes.STRING, allowNull: false },
        price:  { type: DataTypes.DECIMAL, allowNull: false },
        number: { type: DataTypes.INTEGER, allowNull: false },
        numberbaggage: { type: DataTypes.INTEGER, allowNull: true },
        weightbaggage: { type: DataTypes.DECIMAL, allowNull: true }
        
    },
        {
            classMethods: {
                associate: function (models) {
                    Ticket.belongsTo(models.Bus, { foreignKey: "idbus" });                    
                    Ticket.belongsTo(models.Schedule, { foreignKey: "idschedule" });
                    Ticket.hasMany(models.Salesdetail, { foreignKey: "idticket" });
                }
            }
        }
    );
    return Ticket;
};