'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderedProducts', {
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
      
      length: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      size:{
        type:Sequelize.STRING(4),
        allowNull:false
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
    await queryInterface.dropTable('OrderedProducts');
  }
};