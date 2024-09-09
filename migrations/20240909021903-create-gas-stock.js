'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('gas_stocks', {
      stock_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      current_stock: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      restock_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      restocked_by: {
        type: Sequelize.UUID,
        references: {
          model : "AdminModels",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
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
    await queryInterface.dropTable('gas_stocks');
  }
};