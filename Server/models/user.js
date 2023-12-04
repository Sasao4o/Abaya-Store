'use strict';
const {
  Model
} = require('sequelize');
const authTools = require("../utilis/authTools");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //console.log("A7AAAAAAAAAAAAAAAAAAAAAA");
      User.hasMany(models.Product, {foreignKey:"userId", allowNull: false});
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      allowNull:false,
      unique:true,
      type:DataTypes.STRING,
      validate:{
      isEmail:true
      }
    },
      password: {
        type:DataTypes.STRING,
        set(plainPassword) {
          if (plainPassword.length  < 8) throw new Error("password must be more than 8 char");
          this.setDataValue("password", authTools.hashPassword(plainPassword))
        }
      },
    gender: {
      type:DataTypes.STRING,
      validate:{
          isIn:[["male","female"]]
      }
    },
    phoneNumber: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};