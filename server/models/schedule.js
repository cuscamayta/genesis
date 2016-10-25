"use strict";

module.exports = function (sequelize, DataTypes) {
    var Schedule = sequelize.define("Schedule", {
        dateregister: { type: DataTypes.DATE, allowNull: false },
        arrival: { type: DataTypes.STRING, allowNull: false },
        departure: { type: DataTypes.STRING, allowNull: false },
        detail: { type: DataTypes.STRING, allowNull: true }
    },
        {
            classMethods: {
                associate: function (models) {                    
                    Schedule.belongsTo(models.Bus, { foreignKey: "idbus" });
                    Schedule.belongsTo(models.Travel, { foreignKey: "idtravel" });
                    Schedule.hasMany(models.Scheduledetail, { foreignKey: "idschedule" });
                }
            }
        }
    );
    return Schedule;
};