'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderedProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      orderedProduct.belongsTo(models.Product,{allowNull:false, foreignKey:"productId"});
      orderedProduct.belongsTo(models.order,{allowNull:false, foreignKey:"orderId"});
    }
  }
  orderedProduct.init({
    orderId: {
      type: DataTypes.INTEGER,
      allowNull : false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull : false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull : false
    },
    discount: {
      type:DataTypes.DECIMAL(10,2),
      defaultValue:0.00
    }
  }, {
    sequelize,
    modelName: 'orderedProduct',
  });
  return orderedProduct;
};