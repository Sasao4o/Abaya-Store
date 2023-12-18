'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {allowNull:false, foreignKey:"categoryId"});
      Product.hasMany(models.ProductImage, {allowNull:false, foreignKey:"productId",as:'productImages'});
      Product.hasMany(models.OrderedProduct, {allowNull:false, foreignKey:"productId"});
    }
  }
  Product.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryId:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        isNumeric:true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate:{
      min:1
    }
    },
    material:{
      type:DataTypes.STRING(30),
      allowNull:false
    },
    description: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};