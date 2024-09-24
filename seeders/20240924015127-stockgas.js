"use strict";
const { v4 } = require("uuid")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "gas_stocks",
      [
        {
          stock_id : v4(),
          current_stock: 5,
          restock_date: new Date(),
          restocked_by: "5380548d-3c3c-4f90-a390-dbf2e11dd331",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("gas_stocks", null, {});
  },
};
