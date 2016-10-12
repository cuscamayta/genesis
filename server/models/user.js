"use strict";

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    firstname: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, validate: { isEmail: true } },
    idrole: { type: DataTypes.INTEGER, allowNull: false }
  }, {
      getterMethods: {
        fullName: function () { return this.firstname + " " + this.lastname }
      },

      setterMethods: {
        fullName: function (value) {
          var names = value.split(" ");

          this.setDataValue("firstname", names.slice(0, -1).join(' '));
          this.setDataValue("lastname", names.slice(-1).join(' '));
        },
      }
    },
        {
            classMethods:{
                associate:function(models){
                    Comment.belongsTo(models.Role, { foreignKey:'fk_role'} );
                }
            }
        }
    );  
  return User;
};