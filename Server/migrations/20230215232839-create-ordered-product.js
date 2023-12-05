'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orderedProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'orders',
          key: 'id' 
      }
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Products',
          key: 'id' 
      }
      },
      quantity:{
        type: Sequelize.INTEGER,
        allowNull:false
      },
      discount:{
        type:Sequelize.FLOAT,
        defaultValue:0.00,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orderedProducts');
  }
};