'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Discount.init({
    discountCode: {
      type : DataTypes.STRING,
      unique : true,
      allowNull : false
    },
    discountPercentage: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate:{
        min:0,
        max:99
      }
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull : false,
      validate:{
        isAfter:(new Date()).toString(),
        isDate:true
      }
    }
  }, {
    sequelize,
    modelName: 'Discount',
  });
  return Discount;
};