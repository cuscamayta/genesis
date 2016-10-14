module.exports = function (sequelize, DataTypes) {
  var ruta = sequelize.define("ruta", {
    descripcion: { type: DataTypes.STRING, allowNull: false, unique: true },
    ciudaddestino: { type: DataTypes.STRING, allowNull: false },
    ciudadorigen: { type: DataTypes.STRING, allowNull: false },
    alias: { type: DataTypes.STRING, allowNull: false },
    
 
  }, {
      getterMethods: {
        fullruta: function () { return this.descripcion + " " + this.ciudaddestino + this.ciudadorigen + this.alias }
      },

      setterMethods: {
        fullbus: function (value) {
          var rutas = value.split(" ");
          this.setDataValue("descripcion", rutas.slice(0, -1).join(" "));
          this.setDataValue("ciudaddestino", rutas.slice(-1).join(" "));
          this.setDataValue("ciudadorigen", rutas.slice(-1).join(" "));
          this.setDataValue("alias", rutas.slice(-1).join(" "));
        },
      }
    },
    {
      classMethods: {
        associate: function (models) {
          ruta.belongsTo(models.user, { foreignKey: "idruta" });
        }
      }
    }
  );
  return ruta;
};