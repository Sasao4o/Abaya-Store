'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
  
    }
  }
  ProductImage.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    productId:{ 
      type:DataTypes.INTEGER,
      allowNull:false
    },
    fileName: {
      type:DataTypes.STRING,
      allowNull:false
    },
      filePath: { 
        type:DataTypes.STRING,
        allowNull:false
      }
  }, {
    sequelize,
    modelName: 'ProductImage',
  });
  return ProductImage;
};