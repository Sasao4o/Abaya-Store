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
      orderedProduct.belongsTo(models.Order,{allowNull:false, foreignKey:"orderId"});
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
      allowNull : false,
      validate:{
        min:1,
        max:20
      }
    } ,
    length: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        isNumeric:true,
        min:49,
        max:62
   
      }
    },
    size:{
      type:DataTypes.STRING(4),
      allowNull:false,
      validate:{
        isIn: [["xs", "s", "m", "l", "xl", "2xl", "3xl"]]
        }
    }

  }, {
    sequelize,
    modelName: 'OrderedProduct',
  });
  return orderedProduct;
};