'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //order.belongsTo(models.User);
      order.hasMany(models.orderedProduct, {foreignKey:"orderId", allowNull: false});
      order.hasOne(models.Payment, {foreignKey:"orderId", allowNull:false});
      order.hasOne(models.Shipment, {foreignKey:"orderId", allowNull: false});
    }
  }
  order.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull : false
    },
    total_price:{
      type:DataTypes.DECIMAL(10,2),
      defaultValue:0.00,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};