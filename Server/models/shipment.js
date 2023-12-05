'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shipment.belongsTo(models.Order, {allowNull:false, foreignKey:"orderId"});
      //Shipment.hasMany(models.ProductImage, {allowNull:false, foreignKey:"productId"});
    }
  }
  Shipment.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId:{
        type: DataTypes.INTEGER,
        allowNull : false
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
    type: DataTypes.STRING,
    allowNull: false,
    }, 
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip_code: {
      type: DataTypes.STRING
    },
    shipping_date:{
      type: DataTypes.DATE,
      allowNull:true
    }
  }, {
    sequelize,
    modelName: 'Shipment',
  });
  return Shipment;
};