"use strict";
var moment = require("moment");
var common = require('../routes/common');

module.exports = function (sequelize, DataTypes) {
    var Sale = sequelize.define("Sale", {
        dateregister: {
            type: DataTypes.DATE, allowNull: false,
            set: function (val) {
                this.setDataValue('dateregister', common.formatDate(val));
            },
            get: function (val) {
                var date = this.getDataValue('dateregister');
                return moment(date).format("DD/MM/YYYY");
            }
        },
        arrival: { type: DataTypes.STRING, allowNull: false },
        departure: { type: DataTypes.STRING, allowNull: false },
        detail: { type: DataTypes.STRING, allowNull: true }
    },
        {
            classMethods: {
                associate: function (models) {
                    Sale.belongsTo(models.Salesbook, { foreignKey: "idsalesbook" });
                    Sale.belongsTo(models.Schedule, { foreignKey: "idschedule" });
                    Sale.belongsTo(models.User, { foreignKey: "iduser" });
                    Sale.hasMany(models.Salesdetail, { foreignKey: "idsale" });
                }
            }
        }
    );
    return Sale;
};