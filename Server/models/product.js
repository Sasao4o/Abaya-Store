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
      Product.belongsTo(models.User);
      Product.hasMany(models.orderedProduct, {foreignKey:"productId", allowNull: false});
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    image: DataTypes.STRING,
    userId:DataTypes.INTEGER(11),
    methodOfPayment: DataTypes.BOOLEAN,
    description:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};